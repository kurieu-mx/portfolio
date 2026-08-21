# eugeniokuri.com

My portfolio site. Next.js 15 on the App Router, deployed as a container on AWS
by a GitHub Actions pipeline that holds **no long-lived credentials** — no AWS
keys, no SSH keys, no registry password.

**Live:** <https://eugeniokuri.com>

---

## Deployment

The interesting part of this repo is not the site, it is how it ships.

```
push to main
  │
  ├─ CI ......... eslint · tsc --noEmit
  │
  ├─ build ...... OIDC → sts:AssumeRole   (short-lived, pinned to this repo)
  │               docker buildx, multi-stage, Next standalone output
  │               └─ ECR :<sha> + :latest
  │               stage deploy/ → S3
  │
  └─ deploy ..... ssm send-command        (port 22 is never opened)
                  s3 sync → /opt/portfolio
                  docker compose up -d --wait
                  /healthz must report the expected commit
                  └─ mismatch or timeout → roll back to the previous image
```

Design decisions worth naming:

- **No secrets in GitHub — only variables.** GitHub mints a short-lived OIDC
  token; AWS trades it for a role whose trust policy pins the repository and
  branch. A fork cannot assume it.
- **No SSH.** Releases run through SSM Session Manager, so the security group
  opens 80 and 443 and nothing else. Shell access is
  `aws ssm start-session --target <instance-id>`.
- **The health gate checks identity, not liveness.** `/healthz` reports the
  commit the running process was built from. A release that comes up healthy but
  serving the *wrong* image still fails and rolls back — "the container started"
  is not the same claim as "the new code is serving".
- **The instance holds no registry password.** It authenticates to ECR with its
  own IAM role.

Full runbook, including the one-command infrastructure bootstrap, is in
[DEPLOY.md](DEPLOY.md). Running cost is about **$7/month**.

## Stack

| | |
|---|---|
| Framework | Next.js 15 (App Router, RSC), React 19 |
| Language | TypeScript, strict |
| Styling | Tailwind CSS, shadcn/ui, Inter + Geist Mono |
| Charts | Recharts |
| Runtime | Node 22 on Alpine, non-root, `output: "standalone"` |
| Infra | ECR · EC2 `t3a.micro` · S3 · SSM · IAM/OIDC · Caddy |
| DNS/TLS | Cloudflare DNS, Let's Encrypt via Caddy (auto-renewing) |

## Notable implementation details

- **`components/swarm-hero.tsx`** — the hero is a canvas boids simulation:
  separation, alignment and cohesion over a 96px neighbourhood, capped at 2.3
  px/frame, with the agents treating the cursor as an obstacle to avoid. It is a
  small nod to the collision-avoidance work behind the drone-swarm project
  listed on the site.
- **`components/section-fx.tsx`** — three procedural canvas backdrops (radar
  sweep, constellation, rain) sharing one animation loop.
- **`app/opengraph-image.tsx`** — social preview card rendered on demand with
  `next/og` on the edge runtime, which works under self-hosted `next start`, not
  only on Vercel.
- **`components/contact-section.tsx`** — posts to Formspree when
  `NEXT_PUBLIC_FORMSPREE_ENDPOINT` is set, and degrades to a prefilled `mailto:`
  when it is not, so the form is never a dead end.
- **`lib/site.ts`** — the canonical origin comes from `NEXT_PUBLIC_SITE_URL`,
  inlined at build time, and feeds `metadataBase`, OpenGraph, `sitemap.xml` and
  `robots.txt` from one place.

## Quality gates

`next.config.mjs` sets `eslint.ignoreDuringBuilds` and
`typescript.ignoreBuildErrors` to **false**, so a lint or type error fails the
image build and a broken commit cannot produce a deployable artifact. CI runs
both separately as well, for a readable failure instead of a build log to dig
through.

## Local development

```bash
npm ci
npm run dev          # http://localhost:3000

npx eslint .         # what CI runs
npx tsc --noEmit

# exercise the production container
docker build -t portfolio:local --build-arg NEXT_PUBLIC_SITE_URL=http://localhost:3000 .
docker run --rm -p 3000:3000 portfolio:local
```

## Layout

```
app/            routes, metadata, OG image, /healthz
components/     sections and canvas effects
  ui/           shadcn/ui primitives (generated)
lib/site.ts     canonical origin
deploy/         compose stack, Caddyfile, release script, AWS bootstrap
.github/        CI and deploy pipelines
Dockerfile      3-stage build on Next standalone output
DEPLOY.md       infrastructure runbook
```
