/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emit a self-contained server bundle (.next/standalone) so the runtime image
  // ships only the files actually imported, not the whole node_modules tree.
  output: "standalone",

  // Both gates below used to be disabled. They are on now: `recharts` was
  // pinned to ^2 (it was "latest", which floated to 3.x and broke the generated
  // shadcn chart types), and ESLint is configured in eslint.config.mjs.
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },

  images: {
    // Self-hosted optimization is handled by `sharp`, installed in the runner
    // stage of the Dockerfile.
    formats: ["image/avif", "image/webp"],
  },
}

export default nextConfig
