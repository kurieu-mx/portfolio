import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

const siteUrl = "https://portfolio-eugenio-kuri.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Eugenio Kuri | Software & AI Engineer",
  description:
    "Portfolio of Eugenio Kuri — software & AI engineer building intelligent systems: machine learning and LLMs, full-stack applications, and autonomous robotics in Python, Go, and C++. Data Science @ University of Michigan.",
  keywords: [
    "Eugenio Kuri",
    "Software Engineer",
    "AI Engineer",
    "Machine Learning",
    "LLMs",
    "Full-Stack Developer",
    "Backend",
    "Autonomous Systems",
    "Computer Vision",
    "Python",
    "Go",
    "C++",
    "University of Michigan",
  ],
  authors: [{ name: "Eugenio Kuri" }],
  creator: "Eugenio Kuri",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Eugenio Kuri | Software & AI Engineer",
    description: "Building intelligent systems — machine learning, full-stack software, and autonomous robotics in Python, Go, and C++.",
    siteName: "Eugenio Kuri Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eugenio Kuri | Software & AI Engineer",
    description: "Building intelligent systems — machine learning, full-stack software, and autonomous robotics in Python, Go, and C++.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Eugenio Kuri",
  url: siteUrl,
  jobTitle: "Software & AI Engineer",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Michigan",
  },
  knowsAbout: [
    "Software Engineering",
    "Artificial Intelligence",
    "Machine Learning",
    "Full-Stack Development",
    "Autonomous Systems",
    "Computer Vision",
  ],
  sameAs: ["https://github.com/kurieu-mx", "https://www.linkedin.com/in/kurieu/"],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className={`${inter.className} ${GeistMono.variable} bg-dark-grey-900 text-white min-h-screen`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  )
}
