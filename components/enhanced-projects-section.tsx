"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { GithubIcon, ExternalLinkIcon, ChevronRightIcon } from "lucide-react"
import { useMemo, useState } from "react"
import { SectionHeading } from "@/components/section-heading"
import { SectionFX } from "@/components/section-fx"

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
  status: "DEPLOYED" | "ACTIVE" | "CLASSIFIED"
  role: string
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
    status: "ACTIVE",
    role: "Software Engineer · Merlin Drones",
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
    role: "Full-Stack Freelance",
  },
  {
    id: 3,
    code: "M-03",
    title: "AI Bookkeeping Platform",
    description:
      "An automated bookkeeping platform at Embedding Labs that turns invoices and bank statements into double-entry journal entries, with LLM-assisted onboarding and Firestore/BigQuery/OpenAI pipelines.",
    techStack: ["Python", "Next.js", "BigQuery", "Firestore", "OpenAI API"],
    icon: "📒",
    category: "AI/ML",
    status: "DEPLOYED",
    role: "Software Engineer · Embedding Labs",
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
    role: "Independent Research",
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
    role: "U-Michigan Robotics",
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
    role: "Independent Project",
  },
]

const categories = ["All", "Robotics", "AI/ML", "Full Stack"]

const statusColor: Record<Project["status"], string> = {
  DEPLOYED: "text-emerald-400",
  ACTIVE: "text-amber-400",
  CLASSIFIED: "text-sky-400",
}

export function EnhancedProjectsSection() {
  const [category, setCategory] = useState("All")
  const [selectedId, setSelectedId] = useState(1)

  const list = useMemo(
    () => projects.filter((p) => category === "All" || p.category === category),
    [category],
  )
  const selected = list.find((p) => p.id === selectedId) ?? list[0]

  const hasGithub = Boolean(selected?.githubUrl) && selected?.githubUrl !== "#"
  const hasDemo = Boolean(selected?.demoUrl) && selected?.demoUrl !== "#"

  return (
    <section id="projects" className="hud-grid py-16 md:py-24 bg-dark-grey-800">
      <SectionFX variant="radar" />
      <div className="container relative px-4 md:px-6">
        <SectionHeading
          index="01"
          eyebrow="MISSIONS"
          title="Mission Log"
          subtitle="Select a mission to open its briefing."
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

        <div className="grid lg:grid-cols-[minmax(0,340px)_1fr] gap-6">
          {/* Mission list */}
          <div className="hud-panel border border-maize/25 bg-black/40 backdrop-blur-sm">
            <div className="flex items-center justify-between px-4 py-3 border-b border-maize/15 font-mono text-[10px] tracking-widest text-maize/70">
              <span>SELECT MISSION</span>
              <span>{list.length} FOUND</span>
            </div>
            <ul>
              {list.map((p) => {
                const active = selected?.id === p.id
                return (
                  <li key={p.id}>
                    <button
                      onClick={() => setSelectedId(p.id)}
                      aria-current={active}
                      className={`group w-full text-left flex items-center gap-3 px-4 py-3 border-l-2 transition-all ${
                        active
                          ? "border-maize bg-maize/10"
                          : "border-transparent hover:border-maize/40 hover:bg-white/5"
                      }`}
                    >
                      <span className="font-mono text-xs text-maize/60">{p.code}</span>
                      <span className="flex-1 min-w-0">
                        <span className={`block truncate font-semibold ${active ? "text-maize" : "text-gray-200"}`}>
                          {p.title}
                        </span>
                        <span className="block font-mono text-[10px] tracking-wide text-gray-500">
                          {p.category.toUpperCase()}
                        </span>
                      </span>
                      <span className={`font-mono text-[9px] ${statusColor[p.status]}`}>● {p.status}</span>
                      <ChevronRightIcon
                        className={`h-4 w-4 shrink-0 transition-transform ${
                          active ? "text-maize translate-x-0" : "text-gray-600 group-hover:translate-x-0.5"
                        }`}
                      />
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Briefing panel */}
          {selected && (
            <div key={selected.id} className="hud-panel animate-fade-in-up border border-maize/25 bg-dark-grey-900/70 backdrop-blur-sm flex flex-col">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-maize/15 font-mono text-[10px] tracking-widest text-maize/70">
                <span>BRIEFING // {selected.code}</span>
                <span className={statusColor[selected.status]}>● {selected.status}</span>
              </div>

              <div className="relative h-44 sm:h-52 overflow-hidden border-b border-maize/10">
                {selected.imageUrl ? (
                  <Image
                    src={selected.imageUrl}
                    alt={selected.title}
                    width={900}
                    height={500}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-umich-blue via-dark-grey-800 to-dark-grey-950">
                    <span className="text-7xl" aria-hidden="true">
                      {selected.icon}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-grey-900 via-transparent to-transparent" />
              </div>

              <div className="p-5 md:p-6 flex flex-col gap-4 flex-1">
                <div>
                  <p className="font-mono text-[11px] tracking-widest text-maize/60">{selected.role}</p>
                  <h3 className="text-2xl md:text-3xl font-bold text-maize mt-1">{selected.title}</h3>
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

                {(hasGithub || hasDemo) && (
                  <div className="flex flex-wrap gap-3 pt-1 mt-auto">
                    {hasGithub && (
                      <Link href={selected.githubUrl!} target="_blank" rel="noopener noreferrer">
                        <Button
                          variant="outline"
                          className="rounded-none border-maize text-maize hover:bg-maize hover:text-umich-blue-800 bg-transparent"
                        >
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
          )}
        </div>
      </div>
    </section>
  )
}
