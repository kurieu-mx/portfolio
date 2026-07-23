"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

interface TimelineItem {
  id: number
  title: string
  company: string
  period: string
  description: string[]
  technologies: string[]
  type: "work" | "education" | "project"
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Merlin Drones (Remote)",
    period: "May 2026 - Aug 2026",
    description: [
      "Designed a multi-layer collision-avoidance system for autonomous drone swarms in Go, integrating ROS 2, PX4, ORCA, and LiDAR to improve flight safety",
      "Built a real-time edge perception pipeline on Raspberry Pi CM4 (YOLO/ONNX + OpenCV) for accurate GPS localization and continuous target tracking",
      "Implemented end-to-end MAVLink workflows for mission cancellation, in-flight recovery, and transit-speed control across the swarm",
      "Automated validation with a one-command Gazebo simulation test harness wired into CI/CD, and shipped Ground Control Station features (live telemetry, map-based mission planning, GNSS, failsafes)",
      "Resolved distributed-systems failures — leader-election conflicts, race conditions, and command timeouts — improving swarm stability and mission reliability",
    ],
    technologies: ["Go", "ROS 2", "PX4", "Gazebo", "MAVLink", "YOLO", "ONNX", "OpenCV", "LiDAR", "Raspberry Pi CM4"],
    type: "work",
  },
  {
    id: 2,
    title: "Wakey Wakey Robot Project",
    company: "University of Michigan Robotics Department",
    period: "Aug 2025 - Dec 2025",
    description: [
      "Designed and built a system that tracks eye movements with OpenCV to detect student drowsiness",
      "Applied vector and linear mathematics to implement real-time detection logic",
      "Integrated computer vision, robotics, and 3D printing into an interactive water-spraying response system",
      "Showcased hardware-software integration and applied AI for real-world problem solving",
    ],
    technologies: ["OpenCV", "Computer Vision", "Robotics", "3D Printing", "Linear Mathematics"],
    type: "project",
  },
  {
    id: 3,
    title: "Full-Stack Freelance — AI Hair Consultation",
    company: "Francisco Iglesias Salon and Spa",
    period: "Jun 2025 - Aug 2025",
    description: [
      "Designed and built the frontend and backend of an AI-powered hair-consultation system",
      "Built and fine-tuned a custom LLM to assess hair damage and recommend personalized treatments",
      "Achieved a 15% increase in product sales and improved customer retention",
    ],
    technologies: ["Custom LLMs", "Full Stack", "AI Integration", "Next.js"],
    type: "project",
  },
  {
    id: 4,
    title: "Software Engineer",
    company: "Embedding Labs (Remote)",
    period: "May 2025 - Aug 2025",
    description: [
      "Engineered an automated bookkeeping platform in Python that transforms invoices and bank statements into double-entry journal entries",
      "Automated client onboarding by deriving rules from historical ledgers with LLM-assisted fallback and validation, scaling the platform past its three-customer limit",
      "Replaced a vision-based statement parser with a deterministic pdfplumber pipeline, cutting operational complexity",
      "Built responsive operator interfaces in Next.js, React, and TypeScript (policy diffing, FX, onboarding, PDF export)",
      "Integrated Firestore, BigQuery, and OpenAI APIs into scalable financial-document pipelines",
    ],
    technologies: ["Python", "Next.js", "React", "TypeScript", "Firestore", "BigQuery", "OpenAI API", "pdfplumber"],
    type: "work",
  },
  {
    id: 5,
    title: "Instructional Aide",
    company: "Michigan Department of Robotics",
    period: "Jan 2025 - Apr 2025",
    description: [
      "Mentored 10+ undergraduate robotics teams on system architecture, mechanical design, electronics integration, and software debugging",
      "Developed iterative testing protocols that accelerated hardware-software debugging across 8 capstone projects",
      "Provided hands-on support with embedded systems, sensors, motor controllers, and robotics software",
    ],
    technologies: ["Robotics", "Embedded Systems", "Sensors", "Mentoring"],
    type: "work",
  },
  {
    id: 6,
    title: "B.S.E. in Data Science · Minor in Applied Mathematics",
    company: "University of Michigan",
    period: "Ann Arbor, MI",
    description: [
      "Bachelor of Science in Engineering, Data Science, with an Applied Mathematics minor",
      "GPA: 3.68 / 4.0",
      "Relevant coursework: Data Structures & Algorithms, Multivariable & Vector Calculus, Discrete Mathematics, Machine Learning",
    ],
    technologies: ["Python", "C++", "Machine Learning", "Applied Mathematics"],
    type: "education",
  },
]

export function InteractiveTimeline() {
  const [selectedItem, setSelectedItem] = useState<number | null>(null)

  return (
    <div className="relative">
      <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-maize to-umich-blue"></div>

      <div className="space-y-8">
        {timelineData.map((item, index) => (
          <div
            key={item.id}
            className={`relative flex items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
          >
            {/* Timeline dot */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-maize rounded-full border-4 border-umich-blue shadow-lg z-10"></div>

            {/* Content card */}
            <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
              <Card
                className={`hud-panel cursor-pointer transition-all duration-300 hover:shadow-xl border-2 bg-dark-grey-800 ${
                  selectedItem === item.id
                    ? "border-maize shadow-2xl scale-105 shadow-maize/20"
                    : "border-dark-grey-600 hover:border-maize/50"
                }`}
                onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={item.type === "work" ? "default" : item.type === "education" ? "secondary" : "outline"}
                      className={
                        item.type === "work"
                          ? "bg-umich-blue text-maize border-umich-blue"
                          : item.type === "education"
                            ? "bg-maize text-umich-blue border-maize"
                            : "border-umich-blue text-umich-blue bg-transparent"
                      }
                    >
                      {item.type === "work" ? "Work" : item.type === "education" ? "Education" : "Project"}
                    </Badge>
                    <span className="text-sm text-gray-400">{item.period}</span>
                  </div>
                  <CardTitle className="text-maize">{item.title}</CardTitle>
                  <p className="text-maize font-semibold">{item.company}</p>
                </CardHeader>

                {selectedItem === item.id && (
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {item.description.map((desc, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-maize mr-2">•</span>
                          <span className="text-gray-300">{desc}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="outline" className="border-maize text-maize bg-transparent">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
