import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

const siteUrl = "https://portfolio-eugenio-kuri.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Eugenio Kuri | Data Science & AI Developer",
  description:
    "Portfolio of Eugenio Kuri — Data Science & Applied Mathematics student at the University of Michigan building custom LLMs, computer-vision systems, and full-stack AI applications in Python, C++, and Go.",
  keywords: [
    "Eugenio Kuri",
    "Data Science",
    "Machine Learning",
    "LLM",
    "Computer Vision",
    "OpenCV",
    "University of Michigan",
    "Full Stack Developer",
    "Python",
    "Go",
    "C++",
  ],
  authors: [{ name: "Eugenio Kuri" }],
  creator: "Eugenio Kuri",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Eugenio Kuri | Data Science & AI Developer",
    description: "Custom LLMs, computer vision, and full-stack AI — built by a University of Michigan student.",
    siteName: "Eugenio Kuri Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eugenio Kuri | Data Science & AI Developer",
    description: "Custom LLMs, computer vision, and full-stack AI — built by a University of Michigan student.",
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
  jobTitle: "Data Science Student & AI Developer",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Michigan",
  },
  knowsAbout: ["Machine Learning", "Large Language Models", "Computer Vision", "Full-Stack Development"],
  sameAs: ["https://github.com/kurieu-mx", "https://linkedin.com/in/kurieu"],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className={`${inter.className} bg-dark-grey-900 text-white min-h-screen`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  )
}
