# Deploying this site

The site is a containerized Next.js app on a small VPS. Every push to `main`
builds an image, pushes it to GitHub Container Registry, and releases it over
SSH behind a health gate that rolls back on failure.

```
push to main
  │
  ├─ CI ............... eslint · tsc --noEmit
  │
  ├─ build ............ docker buildx (multi-stage, Next standalone)
  │                     └─ ghcr.io/kurieu-mx/portfolio:<sha>  +  :latest
  │
  └─ deploy ........... scp compose files → ssh release.sh
                        docker compose pull && up -d --wait
                        verify /healthz reports the expected commit
                        └─ mismatch or timeout → roll back to previous image
```

Quality gates are enforced in `next.config.mjs` (`ignoreDuringBuilds: false`,
`ignoreBuildErrors: false`), so a lint or type error fails the **image build** —
a broken commit cannot produce a deployable artifact.

## Files

| Path | Role |
|---|---|
| `Dockerfile` | 3-stage build: `deps` → `builder` → `runner` (non-root, `sharp`, healthcheck) |
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

### 2. Server

Hetzner CX22 (~€3.79/mo) or equivalent, Ubuntu 24.04:

```bash
# as root, once
adduser --disabled-password --gecos "" deploy
usermod -aG docker deploy          # after installing Docker
curl -fsSL https://get.docker.com | sh

# lock down ssh: no passwords, no root login
sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
sed -i 's/^#\?PermitRootLogin.*/PermitRootLogin no/'               /etc/ssh/sshd_config
systemctl restart ssh

ufw allow OpenSSH && ufw allow 80 && ufw allow 443 && ufw --force enable
```

Then, as `deploy`:

```bash
mkdir -p ~/portfolio && cd ~/portfolio
cp /path/to/repo/deploy/.env.example .env
$EDITOR .env          # set SITE_DOMAIN; CI overwrites IMAGE on every deploy
```

`release.sh` refuses to run without `.env`, so this step cannot be skipped silently.

### 3. Deploy key

```bash
ssh-keygen -t ed25519 -f ./deploy_key -N ""      # locally
ssh-copy-id -i ./deploy_key.pub deploy@<server>
ssh-keyscan -H <server>                          # value for SSH_KNOWN_HOSTS
```

### 4. GitHub configuration

**Secrets** (Settings → Secrets and variables → Actions → Secrets):

| Name | Value |
|---|---|
| `SSH_HOST` | server IP or hostname |
| `SSH_USER` | `deploy` |
| `SSH_PRIVATE_KEY` | contents of `deploy_key` |
| `SSH_KNOWN_HOSTS` | output of `ssh-keyscan -H <server>` |
| `SSH_PORT` | only if not 22 |

**Variables** (same page → Variables):

| Name | Value |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://yourdomain.com` — no trailing slash |

`NEXT_PUBLIC_SITE_URL` is inlined into the client bundle at build time, so it is
a **build arg**, not a runtime env var. Changing it requires a rebuild, not a
restart. It drives `metadataBase`, OpenGraph, `sitemap.xml` and `robots.txt`
via `lib/site.ts`.

### 5. Make the GHCR package public

After the first successful build: GitHub → Packages → `portfolio` → Package
settings → Change visibility → Public. Otherwise the server needs a registry
login to pull.

## Operating it

```bash
# what is running
cd ~/portfolio && docker compose ps && curl -s localhost/healthz

# logs
docker compose logs -f app
docker compose logs -f caddy

# manual rollback to any previously built commit
./release.sh ghcr.io/kurieu-mx/portfolio:<sha> <sha>
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
