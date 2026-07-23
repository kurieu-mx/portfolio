import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

const siteUrl = "https://portfolio-eugenio-kuri.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Eugenio Kuri | Robotics & Software Engineer",
  description:
    "Portfolio of Eugenio Kuri — robotics & software engineer building autonomous drone swarms (ROS 2, PX4), real-time edge computer vision, and high-performance backends in Go, C++, and Python. Data Science @ University of Michigan.",
  keywords: [
    "Eugenio Kuri",
    "Robotics Engineer",
    "Software Engineer",
    "Autonomous Systems",
    "ROS 2",
    "PX4",
    "Drones",
    "Computer Vision",
    "Go",
    "C++",
    "Python",
    "University of Michigan",
  ],
  authors: [{ name: "Eugenio Kuri" }],
  creator: "Eugenio Kuri",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Eugenio Kuri | Robotics & Software Engineer",
    description: "Autonomous drone swarms, edge computer vision, and high-performance backends in Go, C++, and Python.",
    siteName: "Eugenio Kuri Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eugenio Kuri | Robotics & Software Engineer",
    description: "Autonomous drone swarms, edge computer vision, and high-performance backends in Go, C++, and Python.",
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
  jobTitle: "Robotics & Software Engineer",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Michigan",
  },
  knowsAbout: ["Robotics", "Autonomous Systems", "Computer Vision", "Distributed Systems", "Machine Learning"],
  sameAs: ["https://github.com/kurieu-mx", "https://www.linkedin.com/in/kurieu/"],
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
