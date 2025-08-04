import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Portfolio - Eugenio Kuri | Full Stack Developer",
  description:
    "Professional portfolio of Eugenio Kuri, a full-stack developer and University of Michigan student specializing in React, Next.js, and AI integration.",
  keywords: "full stack developer, react, next.js, typescript, university of michigan, web development, AI",
  authors: [{ name: "Eugenio Kuri" }],
  creator: "Eugenio Kuri",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio-eugenio-kuri.vercel.app",
    title: "Portfolio - Eugenio Kuri",
    description: "Professional portfolio showcasing innovative web development projects and technical expertise.",
    siteName: "Eugenio Kuri Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio - Eugenio Kuri",
    description: "Professional portfolio showcasing innovative web development projects and technical expertise.",
    creator: "@eugeniokuri",
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
