import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { DownloadIcon } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"

const RESUME_PATH = "/Eugenio-Kuri-Resume.pdf"

interface Role {
  title: string
  company: string
  period: string
  bullets: string[]
}

const experience: Role[] = [
  {
    title: "Software Engineer",
    company: "Merlin Drones — Remote",
    period: "May 2026 - Aug 2026",
    bullets: [
      "Designed and implemented a collision-avoidance system for autonomous drone swarms in Go, improving flight safety through ROS 2, PX4, ORCA, and LiDAR integration.",
      "Developed an edge perception pipeline on Raspberry Pi CM4 using YOLO/ONNX and OpenCV, enabling accurate GPS localization and continuous target tracking.",
      "Implemented end-to-end MAVLink workflows for mission cancellation, in-flight recovery, and transit-speed control across the swarm platform.",
      "Engineered a one-command Gazebo simulation test harness for obstacle scenarios, automating validation and repeatable regression testing in CI/CD.",
      "Built Ground Control Station features (live telemetry, map-based mission planning, USB GNSS, failsafes) and resolved distributed-systems failures — leader-election conflicts, race conditions, and command timeouts.",
    ],
  },
  {
    title: "Software Engineer",
    company: "Embedding Labs — Remote",
    period: "May 2025 - Aug 2025",
    bullets: [
      "Engineered an automated bookkeeping platform in Python that transformed invoices and bank statements into double-entry journal entries.",
      "Automated client onboarding by deriving rules from historical ledgers with LLM-assisted fallback and validation, scaling the platform past its three-customer limit.",
      "Replaced a vision-based statement-extraction pipeline with a deterministic pdfplumber parser, reducing operational complexity.",
      "Built responsive operator interfaces in Next.js, React, and TypeScript for policy diffing, FX management, onboarding, and PDF exports.",
      "Integrated Firestore, BigQuery, and OpenAI APIs into scalable pipelines that automated financial-document processing.",
    ],
  },
  {
    title: "Instructional Aide",
    company: "Michigan Department of Robotics — Ann Arbor, MI",
    period: "Jan 2025 - Apr 2025",
    bullets: [
      "Mentored 10+ undergraduate robotics teams on system architecture, mechanical design, electronics integration, and software debugging.",
      "Developed iterative testing protocols that accelerated hardware-software debugging across 8 capstone robotics projects.",
      "Provided hands-on support with embedded systems, sensors, motor controllers, and robotics software.",
    ],
  },
]

const skillGroups = [
  { label: "Languages", items: "C++, Go (Golang), Python, TypeScript, JavaScript, SQL" },
  { label: "Robotics & Systems", items: "ROS 2, PX4, Gazebo, MAVLink, embedded systems, Raspberry Pi CM4" },
  { label: "Vision & ML", items: "OpenCV, YOLO, ONNX, custom LLMs, OpenAI API" },
  { label: "Cloud & Data", items: "GCP, Firestore, BigQuery, SQL" },
  { label: "Tools & Practices", items: "Git, Linux, CI/CD, distributed systems, cross-functional collaboration" },
  { label: "Languages (spoken)", items: "English (native), Spanish (native)" },
]

export function ResumeSection() {
  return (
    <section id="resume-download" className="hud-grid scanlines py-16 md:py-24 bg-dark-grey-900">
      <div className="container px-4 md:px-6">
        <SectionHeading index="05" eyebrow="DOSSIER" title="Résumé" subtitle="Experience, skills, and the one-page PDF." />

        <div className="max-w-3xl mx-auto space-y-8">
          <Card className="hud-panel shadow-lg border-2 border-dark-grey-600 bg-dark-grey-800">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 space-y-0">
              <div>
                <CardTitle className="text-maize">Download my résumé</CardTitle>
                <p className="text-sm text-gray-400 mt-1">The full one-page PDF, up to date.</p>
              </div>
              <Link href={RESUME_PATH} target="_blank" rel="noopener noreferrer" download>
                <Button className="bg-maize text-umich-blue-800 hover:bg-maize-600 shrink-0">
                  <DownloadIcon className="h-4 w-4 mr-2" /> Download PDF
                </Button>
              </Link>
            </CardHeader>
          </Card>

          <Card className="hud-panel shadow-lg border-2 border-dark-grey-600 bg-dark-grey-800">
            <CardHeader>
              <CardTitle className="text-maize">Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {experience.map((role) => (
                <div key={`${role.company}-${role.period}`}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <h3 className="font-semibold text-lg text-maize">
                      {role.title} · {role.company}
                    </h3>
                    <p className="text-sm text-gray-400 shrink-0">{role.period}</p>
                  </div>
                  <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
                    {role.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="hud-panel shadow-lg border-2 border-dark-grey-600 bg-dark-grey-800">
            <CardHeader>
              <CardTitle className="text-maize">Skills &amp; Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {skillGroups.map((group) => (
                <div key={group.label}>
                  <h3 className="font-semibold text-maize">{group.label}</h3>
                  <p className="text-gray-300">{group.items}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
