// Canonical origin for metadata, OpenGraph, sitemap and robots.
//
// Set NEXT_PUBLIC_SITE_URL at build time (it is inlined into the client bundle,
// so it must be present during `next build`, not just at runtime). The
// Dockerfile takes it as a build arg; CI passes it from repository variables.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "")
