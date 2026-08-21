import { NextResponse } from "next/server"

// Liveness probe for the container healthcheck and the post-deploy gate.
// Must never be cached or statically prerendered, or it would report the
// health of the build rather than of the running process.
export const dynamic = "force-dynamic"

export function GET() {
  return NextResponse.json(
    { status: "ok", commit: process.env.GIT_SHA ?? "dev", uptime: Math.round(process.uptime()) },
    { headers: { "cache-control": "no-store" } },
  )
}
