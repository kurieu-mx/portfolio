"use client"

import { useState } from "react"
import { SectionHeading } from "@/components/section-heading"

interface Tech {
  name: string
  icon: string
  color: string
  group: string
}

const technologies: Tech[] = [
  { name: "Go", icon: "🐹", color: "#00ADD8", group: "Languages" },
  { name: "C++", icon: "⚙️", color: "#00599C", group: "Languages" },
  { name: "Python", icon: "🐍", color: "#3776AB", group: "Languages" },
  { name: "TypeScript", icon: "🔷", color: "#3178C6", group: "Languages" },
  { name: "ROS 2", icon: "🤖", color: "#22A7F0", group: "Robotics" },
  { name: "PX4", icon: "🚁", color: "#3CA9E0", group: "Robotics" },
  { name: "Gazebo", icon: "🌐", color: "#FF6600", group: "Robotics" },
  { name: "MAVLink", icon: "📡", color: "#1793D1", group: "Robotics" },
  { name: "OpenCV", icon: "👁️", color: "#5C3EE8", group: "Vision / ML" },
  { name: "YOLO", icon: "🎯", color: "#00C4A7", group: "Vision / ML" },
  { name: "ONNX", icon: "🧩", color: "#7B61FF", group: "Vision / ML" },
  { name: "OpenAI API", icon: "🧠", color: "#10A37F", group: "Vision / ML" },
  { name: "GCP", icon: "☁️", color: "#4285F4", group: "Cloud / Data" },
  { name: "BigQuery", icon: "📊", color: "#669DF6", group: "Cloud / Data" },
  { name: "Firestore", icon: "🔥", color: "#FFCA28", group: "Cloud / Data" },
  { name: "Raspberry Pi", icon: "🥧", color: "#C51A4A", group: "Hardware" },
  { name: "Linux", icon: "🐧", color: "#FCC624", group: "Tools" },
  { name: "Git", icon: "🔧", color: "#F05032", group: "Tools" },
]

export function TechStackShowcase() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)

  return (
    <div className="py-16 bg-dark-grey-900">
      <div className="container px-4 md:px-6">
        <SectionHeading index="03" eyebrow="STACK" title="Toolbox" subtitle="The technologies I build with day to day." />
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
          {technologies.map((tech) => {
            const isActive = hoveredTech === tech.name
            return (
              <div
                key={tech.name}
                className="group relative flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-dark-grey-800/80 border border-dark-grey-600 transition-all duration-300 hover:-translate-y-1 cursor-default"
                onMouseEnter={() => setHoveredTech(tech.name)}
                onMouseLeave={() => setHoveredTech(null)}
                style={{
                  borderColor: isActive ? tech.color : undefined,
                  boxShadow: isActive ? `0 8px 30px -8px ${tech.color}80` : undefined,
                }}
              >
                <span className="text-3xl transition-transform duration-300 group-hover:scale-125">{tech.icon}</span>
                <span className="text-xs font-medium text-center text-gray-300 group-hover:text-white transition-colors">
                  {tech.name}
                </span>
                <span
                  className="pointer-events-none absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-wide text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                >
                  {tech.group}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
