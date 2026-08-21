#!/usr/bin/env bash
# Runs ON THE SERVER. Pulls the new image, swaps it in behind a health gate,
# and restores the previous image if the new one does not come up healthy.
#
#   usage: release.sh <image-ref> <expected-git-sha>
set -euo pipefail

IMAGE="${1:?usage: release.sh <image-ref> <expected-git-sha>}"
EXPECTED_SHA="${2:?usage: release.sh <image-ref> <expected-git-sha>}"

cd "$(dirname "$0")"

env_file=.env
[ -f "$env_file" ] || { echo "missing $PWD/$env_file (copy .env.example and set SITE_DOMAIN)" >&2; exit 1; }

set_image() {
  local ref="$1" tmp
  tmp="$(mktemp)"
  grep -v -E '^IMAGE=' "$env_file" > "$tmp" || true
  printf 'IMAGE=%s\n' "$ref" >> "$tmp"
  mv "$tmp" "$env_file"
}

previous="$(grep -E '^IMAGE=' "$env_file" | cut -d= -f2- || true)"
echo "current: ${previous:-<none>}"
echo "target:  ${IMAGE}"

docker compose pull app
set_image "$IMAGE"

deploy_ok=0
if docker compose up -d --wait --wait-timeout 90; then
  # --wait gates on the container healthcheck. Also confirm the process is
  # serving the commit we think we shipped, which catches a stale-tag pull.
  served="$(docker compose exec -T app node -e \
    'fetch("http://127.0.0.1:3000/healthz").then(r=>r.json()).then(j=>console.log(j.commit))' | tr -d '\r\n')"
  echo "serving commit: ${served}"
  [ "$served" = "$EXPECTED_SHA" ] && deploy_ok=1 \
    || echo "health reports '${served}', expected '${EXPECTED_SHA}'" >&2
fi

if [ "$deploy_ok" = "1" ]; then
  echo "deploy ok"
  docker image prune -f --filter "until=168h" >/dev/null || true
  exit 0
fi

echo "DEPLOY FAILED -- rolling back" >&2
if [ -n "$previous" ] && [ "$previous" != "$IMAGE" ]; then
  set_image "$previous"
  docker compose up -d --wait --wait-timeout 90
  echo "rolled back to ${previous}" >&2
else
  echo "no previous image recorded; leaving stack as-is" >&2
fi
exit 1
