# syntax=docker/dockerfile:1.7

# ---------------------------------------------------------------------------
# deps -- install node_modules once, cached on the lockfile alone so that a
# source-only change never re-runs npm ci.
# ---------------------------------------------------------------------------
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --no-audit --no-fund

# ---------------------------------------------------------------------------
# builder -- typecheck, lint and compile. next.config.mjs has the ESLint and
# TypeScript gates enabled, so a type error or lint error fails the image build
# rather than shipping.
# ---------------------------------------------------------------------------
FROM node:22-alpine AS builder
WORKDIR /app

# NEXT_PUBLIC_* is inlined into the client bundle at build time, so the origin
# has to be known here -- it cannot be injected at container start.
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---------------------------------------------------------------------------
# runner -- only the standalone server, its traced deps, and static assets.
# ---------------------------------------------------------------------------
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# sharp powers next/image optimization when self-hosting; Vercel's optimizer is
# not there to do it. Installed in the runner only -- the builder does not need it.
RUN --mount=type=cache,target=/root/.npm \
    npm install --no-audit --no-fund --omit=dev sharp \
 && addgroup -g 1001 -S nodejs \
 && adduser -u 1001 -S nextjs -G nodejs

# `output: "standalone"` emits server.js plus a minimal node_modules, but it
# deliberately does NOT copy public/ or .next/static -- those are copied here.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Stamped by CI so /healthz can report exactly which commit is serving.
ARG GIT_SHA=dev
ENV GIT_SHA=${GIT_SHA}

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/healthz').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
