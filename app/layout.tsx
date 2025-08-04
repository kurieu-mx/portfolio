import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "John Doe - Full Stack Developer | UMich Alumnus",
  description:
    "Professional portfolio of John Doe, a full-stack developer and University of Michigan alumnus specializing in React, Next.js, and AI integration.",
  keywords: "full stack developer, react, next.js, typescript, university of michigan, web development, AI",
  authors: [{ name: "John Doe" }],
  creator: "John Doe",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://johndoe-portfolio.vercel.app",
    title: "John Doe - Full Stack Developer",
    description: "Professional portfolio showcasing innovative web development projects and technical expertise.",
    siteName: "John Doe Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "John Doe - Full Stack Developer",
    description: "Professional portfolio showcasing innovative web development projects and technical expertise.",
    creator: "@johndoe",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className={`${inter.className} bg-dark-grey-900 text-white min-h-screen`}>{children}</body>
    </html>
  )
}
