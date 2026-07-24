"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { GithubIcon, ExternalLinkIcon, LockIcon, MailIcon, LinkedinIcon } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { SectionHeading } from "@/components/section-heading"
import { SectionFX } from "@/components/section-fx"

const LINKEDIN = "https://www.linkedin.com/in/kurieu/"
const EMAIL = "kurieu@umich.edu"

type Status = "DEPLOYED" | "ACTIVE" | "CLASSIFIED"

interface Project {
  id: number
  code: string
  title: string
  description: string
  techStack: string[]
  imageUrl?: string
  icon?: string
  githubUrl?: string
  demoUrl?: string
  category: string
  status: Status
  org: string
  role: string
  timeframe: string
  proprietary?: boolean
}

const projects: Project[] = [
  {
    id: 1,
    code: "M-01",
    title: "Autonomous Drone Swarm",
    description:
      "Multi-layer collision-avoidance for autonomous drone swarms — built in Go with ROS 2, PX4, ORCA, and LiDAR, plus MAVLink mission workflows and a Gazebo CI/CD test harness. Real-time edge perception (YOLO/ONNX) ran on Raspberry Pi CM4.",
    techStack: ["Go", "ROS 2", "PX4", "MAVLink", "LiDAR", "Gazebo", "YOLO"],
    icon: "🚁",
    category: "Robotics",
    status: "CLASSIFIED",
    org: "Merlin Drones",
    role: "Software Engineer",
    timeframe: "2026",
    proprietary: true,
  },
  {
    id: 2,
    code: "M-02",
    title: "AI Hair-Consultation System",
    description:
      "Full-stack freelance build for Francisco Iglesias Salon & Spa. A fine-tuned custom LLM assesses hair damage and recommends personalized product routines — driving a 15% increase in sales.",
    techStack: ["Custom LLMs", "Next.js", "AI Integration", "Python", "Machine Learning"],
    imageUrl: "/images/Hair.png",
    githubUrl: "https://github.com/kurieu-mx/ai-hair-consultation-platform",
    demoUrl: "https://v0-francisco-iglesias.vercel.app/",
    category: "Full Stack",
    status: "DEPLOYED",
    org: "Francisco Iglesias Salon & Spa",
    role: "Full-Stack Freelance",
    timeframe: "2025",
  },
  {
    id: 3,
    code: "M-03",
    title: "AI Bookkeeping Platform",
    description:
      "An automated bookkeeping platform that turns invoices and bank statements into double-entry journal entries, with LLM-assisted client onboarding and Firestore / BigQuery / OpenAI pipelines. Scaled the product past its early customer limit.",
    techStack: ["Python", "Next.js", "BigQuery", "Firestore", "OpenAI API"],
    icon: "📒",
    category: "AI/ML",
    status: "CLASSIFIED",
    org: "Embedding Labs",
    role: "Software Engineer",
    timeframe: "2025",
    proprietary: true,
  },
  {
    id: 4,
    code: "M-04",
    title: "AdHoc-GPT",
    description:
      "A transformer-based language model built from scratch — architecture, training, and tokenization — specialized for diplomatic dialogue, debate, and resolution drafting in Model UN scenarios.",
    techStack: ["Python", "Transformers", "PyTorch", "NLP", "Diplomatic AI", "MUN"],
    imageUrl: "/images/mun.png",
    githubUrl: "https://github.com/kurieu-mx/AdHoc-GPT",
    category: "AI/ML",
    status: "ACTIVE",
    org: "Independent Research",
    role: "Solo build",
    timeframe: "2025",
  },
  {
    id: 5,
    code: "M-05",
    title: "Wakey Wakey Robot",
    description:
      "A U-Michigan robotics build that tracks eye movements with OpenCV to detect drowsiness, using vector math for real-time detection and 3D printing for a water-spraying response system.",
    techStack: ["OpenCV", "Computer Vision", "Robotics", "3D Printing", "Python"],
    imageUrl: "/images/Sleep.png",
    githubUrl: "https://github.com/kurieu-mx/wakey_wakey",
    category: "Robotics",
    status: "DEPLOYED",
    org: "U-Michigan Robotics",
    role: "Team project",
    timeframe: "2025",
  },
  {
    id: 6,
    code: "M-06",
    title: "AI Internship Scraper",
    description:
      "An LLM-powered ETL pipeline that filters ~15k community-sourced postings into a clean dataset of active US tech internships, with local-LLM classification and Google Sheets sync via GitHub Actions.",
    techStack: ["Python", "ETL", "Ollama", "Web Scraping", "GitHub Actions"],
    imageUrl: "/images/Scrapper.jpg",
    githubUrl: "https://github.com/kurieu-mx/Internship_Agreggation_Platform",
    category: "AI/ML",
    status: "DEPLOYED",
    org: "Independent Project",
    role: "Solo build",
    timeframe: "2025",
  },
]

const categories = ["All", "Robotics", "AI/ML", "Full Stack"]

const statusColor: Record<Status, string> = {
  DEPLOYED: "text-emerald-400",
  ACTIVE: "text-amber-400",
  CLASSIFIED: "text-sky-400",
}
const statusDot: Record<Status, string> = {
  DEPLOYED: "bg-emerald-400",
  ACTIVE: "bg-amber-400",
  CLASSIFIED: "bg-sky-400",
}

// Stable radar coordinates per project (percent within the square)
const radarPos = projects.map((_, i) => {
  const ang = ((i * 60 - 90) * Math.PI) / 180
  const rad = i % 2 === 0 ? 0.68 : 0.42
  return { x: 50 + Math.cos(ang) * rad * 50, y: 50 + Math.sin(ang) * rad * 50 }
})
const posFor = (id: number) => radarPos[projects.findIndex((p) => p.id === id)]

const SCRAMBLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>#*"

function DecodedText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text)
  useEffect(() => {
    const steps = Math.max(8, Math.min(22, text.length))
    let frame = 0
    const id = setInterval(() => {
      frame++
      const revealed = Math.floor((frame / steps) * text.length)
      setDisplay(
        text
          .split("")
          .map((ch, i) => (ch === " " || i < revealed ? ch : SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)]))
          .join(""),
      )
      if (frame >= steps) {
        clearInterval(id)
        setDisplay(text)
      }
    }, 28)
    return () => clearInterval(id)
  }, [text])
  return <>{display}</>
}

function Readout({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-mono text-[9px] tracking-widest text-gray-500">{label}</span>
      <span className="text-sm text-gray-200">{value}</span>
    </div>
  )
}

export function EnhancedProjectsSection() {
  const [category, setCategory] = useState("All")
  const [selectedId, setSelectedId] = useState(1)

  const list = useMemo(() => projects.filter((p) => category === "All" || p.category === category), [category])
  const selected = list.find((p) => p.id === selectedId) ?? list[0]

  const hasGithub = Boolean(selected?.githubUrl) && selected?.githubUrl !== "#"
  const hasDemo = Boolean(selected?.demoUrl) && selected?.demoUrl !== "#"

  const briefingMailto = selected
    ? `mailto:${EMAIL}?subject=${encodeURIComponent(`Briefing request — ${selected.title}`)}&body=${encodeURIComponent(
        `Hi Eugenio, I'd love to hear more about your work on ${selected.title} at ${selected.org}.`,
      )}`
    : `mailto:${EMAIL}`

  return (
    <section id="projects" className="hud-grid py-16 md:py-24 bg-dark-grey-800">
      <SectionFX variant="radar" />
      <div className="container relative px-4 md:px-6">
        <SectionHeading
          index="01"
          eyebrow="MY WORK"
          title="Mission Log"
          subtitle="Projects I've built — open-source work plus proprietary systems from my roles at companies. Tap a contact on the radar to open its briefing."
        />

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 font-mono text-xs">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={`px-3 py-1.5 border transition-colors ${
                category === c
                  ? "border-maize bg-maize/15 text-maize"
                  : "border-dark-grey-600 text-gray-400 hover:border-maize/50 hover:text-maize"
              }`}
            >
              {c.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[minmax(0,360px)_1fr] gap-8">
          {/* Radar selector */}
          <div className="self-start">
            <div className="relative mx-auto aspect-square w-full max-w-[360px]">
              {/* rings */}
              <div className="absolute inset-0 rounded-full border border-maize/20" />
              <div className="absolute inset-[16%] rounded-full border border-maize/15" />
              <div className="absolute inset-[33%] rounded-full border border-maize/12" />
              <div className="absolute inset-[50%] rounded-full border border-maize/10" />
              <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-maize/10" />
              <div className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 bg-maize/10" />
              {/* sweep */}
              <div
                className="radar-sweep pointer-events-none absolute inset-0 rounded-full"
                style={{ background: "conic-gradient(from 0deg, rgba(255,203,5,0.20), transparent 38%)" }}
                aria-hidden="true"
              />
              {/* center */}
              <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-maize" />

              {/* blips */}
              {list.map((p) => {
                const pos = posFor(p.id)
                const active = selected?.id === p.id
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedId(p.id)}
                    aria-current={active}
                    aria-label={`${p.title} — ${p.org}, ${p.status}`}
                    title={`${p.code} · ${p.title}`}
                    className="group absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5"
                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                  >
                    <span className="relative flex h-3 w-3 items-center justify-center">
                      {active && (
                        <span className={`absolute h-3 w-3 rounded-full ${statusDot[p.status]} opacity-60 animate-ping`} />
                      )}
                      <span
                        className={`relative rounded-full transition-all ${statusDot[p.status]} ${
                          active
                            ? "h-3 w-3 ring-2 ring-maize ring-offset-2 ring-offset-dark-grey-800"
                            : "h-2 w-2 opacity-70 group-hover:opacity-100 group-hover:scale-125"
                        }`}
                      />
                    </span>
                    <span
                      className={`font-mono text-[9px] tracking-wide whitespace-nowrap transition-colors ${
                        active ? "text-maize" : "text-maize/50 group-hover:text-maize"
                      }`}
                    >
                      {p.code}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* caption */}
            {selected && (
              <p className="mt-4 text-center font-mono text-xs text-maize">
                ▸ {selected.code} · {selected.title}
                <span className="block text-[10px] text-gray-500 mt-1">
                  {list.length} CONTACT{list.length === 1 ? "" : "S"} ON SCOPE
                </span>
              </p>
            )}
          </div>

          {/* Briefing panel */}
          {selected && (
            <div
              key={selected.id}
              className="hud-panel animate-fade-in-up relative overflow-hidden border border-maize/25 bg-dark-grey-900/70 backdrop-blur-sm flex flex-col"
            >
              {/* decode scan bar */}
              <div className="briefing-scan pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-maize/25 to-transparent" />

              <div className="flex items-center justify-between px-4 py-2.5 border-b border-maize/15 font-mono text-[10px] tracking-widest text-maize/70">
                <span>BRIEFING // {selected.code}</span>
                <span className={statusColor[selected.status]}>● {selected.status}</span>
              </div>

              <div className="relative h-44 sm:h-52 overflow-hidden border-b border-maize/10">
                {selected.imageUrl ? (
                  <Image src={selected.imageUrl} alt={selected.title} width={900} height={500} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-umich-blue via-dark-grey-800 to-dark-grey-950">
                    <span className="text-7xl" aria-hidden="true">
                      {selected.icon}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-grey-900 via-transparent to-transparent" />
                {selected.proprietary && (
                  <span className="absolute top-3 left-3 flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-sky-300 bg-black/60 border border-sky-400/40 px-2 py-1">
                    <LockIcon className="h-3 w-3" /> PROPRIETARY
                  </span>
                )}
              </div>

              <div className="p-5 md:p-6 flex flex-col gap-4 flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-maize font-mono">
                  <DecodedText text={selected.title} />
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-y border-dark-grey-600 py-3">
                  <Readout label="ORG" value={selected.org} />
                  <Readout label="ROLE" value={selected.role} />
                  <Readout label="TIMEFRAME" value={selected.timeframe} />
                  <Readout label="STATUS" value={selected.status} />
                </div>

                <p className="text-gray-300 leading-relaxed">{selected.description}</p>

                <div>
                  <p className="font-mono text-[10px] tracking-widest text-gray-500 mb-2">SYSTEMS</p>
                  <div className="flex flex-wrap gap-2">
                    {selected.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-maize/15 text-maize border border-maize/20">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-1 mt-auto">
                  {selected.proprietary ? (
                    <div className="space-y-3">
                      <p className="text-sm text-gray-400 flex items-start gap-2">
                        <LockIcon className="h-4 w-4 mt-0.5 shrink-0 text-sky-400" />
                        <span>
                          Built as part of my work at{" "}
                          <span className="text-gray-200 font-medium">{selected.org}</span>. The source is under NDA —
                          but I&apos;m happy to walk through the architecture and exactly what I built. Reach out for a
                          briefing.
                        </span>
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <Link href={briefingMailto}>
                          <Button className="rounded-none bg-maize text-umich-blue-800 hover:bg-maize-600">
                            <MailIcon className="h-4 w-4 mr-2" /> Request a Briefing
                          </Button>
                        </Link>
                        <Link href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" className="rounded-none border-maize text-maize hover:bg-maize hover:text-umich-blue-800 bg-transparent">
                            <LinkedinIcon className="h-4 w-4 mr-2" /> DM on LinkedIn
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-3">
                      {hasGithub && (
                        <Link href={selected.githubUrl!} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" className="rounded-none border-maize text-maize hover:bg-maize hover:text-umich-blue-800 bg-transparent">
                            <GithubIcon className="h-4 w-4 mr-2" /> View Code
                          </Button>
                        </Link>
                      )}
                      {hasDemo && (
                        <Link href={selected.demoUrl!} target="_blank" rel="noopener noreferrer">
                          <Button className="rounded-none bg-maize text-umich-blue-800 hover:bg-maize-600">
                            <ExternalLinkIcon className="h-4 w-4 mr-2" /> Live Demo
                          </Button>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
