# Deploying this site

The site is a containerized Next.js app on a small VPS. Every push to `main`
builds an image, pushes it to GitHub Container Registry, and releases it over
SSH behind a health gate that rolls back on failure.

```
push to main
  │
  ├─ CI ............... eslint · tsc --noEmit
  │
  ├─ build ............ OIDC → sts:AssumeRole (no stored AWS keys)
  │                     docker buildx (multi-stage, Next standalone)
  │                     └─ <acct>.dkr.ecr.us-east-1.amazonaws.com/portfolio:<sha>
  │                     stage deploy/ → S3
  │
  └─ deploy ........... ssm send-command (no SSH, port 22 never opens)
                        s3 sync → /opt/portfolio
                        docker compose pull && up -d --wait
                        verify /healthz reports the expected commit
                        └─ mismatch or timeout → roll back to previous image
```

Runs on AWS: EC2 `t3a.micro` behind Caddy, images in ECR, releases driven
through SSM. There are **no long-lived credentials anywhere** — GitHub mints a
short-lived OIDC token that AWS trades for a role scoped to this repo and
branch, and the instance pulls from ECR with its own instance role.

Quality gates are enforced in `next.config.mjs` (`ignoreDuringBuilds: false`,
`ignoreBuildErrors: false`), so a lint or type error fails the **image build** —
a broken commit cannot produce a deployable artifact.

## Files

| Path | Role |
|---|---|
| `Dockerfile` | 3-stage build: `deps` → `builder` → `runner` (non-root, `sharp`, healthcheck) |
| `deploy/aws-bootstrap.sh` | Creates ECR, S3, IAM/OIDC, security group, EC2, Elastic IP |
| `deploy/docker-compose.yml` | App + Caddy, run on the server |
| `deploy/Caddyfile` | TLS termination, cache headers, reverse proxy |
| `deploy/release.sh` | Server-side release: pull, swap, health-gate, roll back |
| `.github/workflows/ci.yml` | Lint + typecheck on PRs and `main` |
| `.github/workflows/deploy.yml` | Build → push → deploy |
| `app/healthz/route.ts` | Liveness probe; reports the serving commit |

## One-time setup

### 1. DNS (Cloudflare)

Domain is `eugeniokuri.com`, registered through Cloudflare, so DNS is managed
there too. Once the server has an IP, add:

| Type | Name | Content | Proxy |
|---|---|---|---|
| `A` | `@` | server IPv4 | **DNS only** (grey) at first |
| `AAAA` | `@` | server IPv6 | **DNS only** (grey) at first |
| `CNAME` | `www` | `eugeniokuri.com` | **DNS only** (grey) at first |

**Start grey-clouded.** Caddy gets its certificate from Let's Encrypt on the
first request. With the orange cloud on, the TLS-ALPN-01 challenge cannot
reach the origin, and issuance is at best flaky. Grey cloud, confirm
`https://eugeniokuri.com` serves with a valid Let's Encrypt cert, and only
then decide about proxying.

**If you turn the orange cloud on afterwards, set SSL/TLS mode to
`Full (strict)` first.** The default on some zones is `Flexible`, which
terminates TLS at Cloudflare and talks plain HTTP to the origin — Caddy
answers that with a redirect to HTTPS, Cloudflare follows it back to itself,
and the site dies in an infinite redirect loop. `Full (strict)` is the only
correct setting here, and it works because Caddy holds a real public cert.

Proxying is optional. It buys DDoS protection, caching and a hidden origin IP;
it costs you real client IPs in logs unless you uncomment the `trusted_proxies`
block in `deploy/Caddyfile`. Either choice is defensible — grey cloud is one
less moving part, and the site is behind a CDN either way only if you want it.

### 2. AWS infrastructure

```bash
aws sso login --profile kroger
./deploy/aws-bootstrap.sh
```

Idempotent — re-running reuses whatever already exists. It creates:

| Resource | Notes |
|---|---|
| ECR repository | scan-on-push; untagged layers expire after 14 days |
| S3 bucket | staging for `deploy/`; encrypted, all public access blocked |
| OIDC provider + role | trust policy pins `repo:kurieu-mx/portfolio:ref:refs/heads/main` |
| EC2 instance role | SSM core + ECR read-only + read the deploy bucket |
| Security group | **80 and 443 only** — port 22 is deliberately never opened |
| EC2 `t3a.micro` | Amazon Linux 2023, IMDSv2 required, 20 GB encrypted gp3 |
| Elastic IP | free while attached; keeps DNS stable across reboots |

It prints the variable values to paste into GitHub at the end.

### 3. Seed the server

```bash
aws ssm start-session --target <instance-id> --profile kroger --region us-east-1
sudo mkdir -p /opt/portfolio
sudo tee /opt/portfolio/.env <<'EOF'
IMAGE=<acct>.dkr.ecr.us-east-1.amazonaws.com/portfolio:latest
SITE_DOMAIN=eugeniokuri.com
EOF
```

`release.sh` refuses to run without `.env`, so this cannot be skipped silently.

### 4. GitHub configuration

All **variables**, no secrets — OIDC removes the need for stored credentials
(Settings → Secrets and variables → Actions → Variables):

| Name | Value |
|---|---|
| `AWS_ROLE_ARN` | printed by the bootstrap script |
| `DEPLOY_BUCKET` | printed by the bootstrap script |
| `EC2_INSTANCE_ID` | printed by the bootstrap script |
| `NEXT_PUBLIC_SITE_URL` | `https://eugeniokuri.com` — no trailing slash |

`NEXT_PUBLIC_SITE_URL` is inlined into the client bundle at build time, so it is
a **build arg**, not a runtime env var. Changing it requires a rebuild, not a
restart. It drives `metadataBase`, OpenGraph, `sitemap.xml` and `robots.txt`
via `lib/site.ts`.

`AWS_ROLE_ARN` doubles as the switch that arms deployment: both jobs are
guarded on it and stay skipped until it is set.

## Operating it

```bash
# shell on the box -- no SSH key, no open port
aws ssm start-session --target <instance-id> --profile kroger --region us-east-1

cd /opt/portfolio
docker compose ps
docker compose logs -f app
docker compose logs -f caddy

# manual rollback to any previously built commit
./release.sh <acct>.dkr.ecr.us-east-1.amazonaws.com/portfolio:<sha> <sha>
```

Re-run a deploy without a code change from the Actions tab → Deploy →
Run workflow (`workflow_dispatch`).

## Local development

```bash
npm ci
npm run dev            # http://localhost:3000

# exercise the production container locally
docker build -t portfolio:local --build-arg NEXT_PUBLIC_SITE_URL=http://localhost:3000 .
docker run --rm -p 3000:3000 portfolio:local
```

## Notes

- `output: "standalone"` in `next.config.mjs` is what makes the runtime image
  small; the Dockerfile copies `public/` and `.next/static` explicitly because
  the standalone bundle deliberately omits them.
- `sharp` is installed in the runner stage only — self-hosted `next/image`
  optimization needs it, and Vercel's optimizer is not there to do the work.
- `app/opengraph-image.tsx` uses the edge runtime; this works under
  `next start`/standalone and returns a 1200×630 PNG.
- Vercel can stay connected in parallel; it is unaffected by any of this.
- The image is built `linux/amd64` because the repo is private, where GitHub's
  free ARM runners are not available and `linux/arm64` would mean QEMU
  emulation. Making the repo public would allow a Graviton `t4g.micro` and a
  native ARM build, for roughly $0.73/mo less.
