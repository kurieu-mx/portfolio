"use client"

import { useState } from "react"

const technologies = [
  { name: "Python", icon: "🐍", color: "#3776AB" },
  { name: "C++", icon: "⚡", color: "#00599C" },
  { name: "Go", icon: "🔵", color: "#00ADD8" },
  { name: "OpenCV", icon: "👁️", color: "#5C3EE8" },
  { name: "Machine Learning", icon: "🤖", color: "#FF6B6B" },
  { name: "AWS", icon: "☁️", color: "#FF9900" },
  { name: "Firebase", icon: "🔥", color: "#FFCA28" },
  { name: "Raspberry Pi", icon: "🥧", color: "#C51A4A" },
  { name: "OpenAI APIs", icon: "🧠", color: "#10A37F" },
  { name: "SQL", icon: "🗄️", color: "#336791" },
]

export function TechStackShowcase() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)

  return (
    <div className="py-12 bg-dark-grey-900">
      <h3 className="text-2xl font-bold text-center mb-8 text-maize">Technologies I Work With</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 container px-4 md:px-6">
        {technologies.map((tech, index) => (
          <div
            key={tech.name}
            className="group relative flex flex-col items-center p-4 rounded-lg bg-dark-grey-800 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer border-2 border-dark-grey-600 hover:border-maize"
            onMouseEnter={() => setHoveredTech(tech.name)}
            onMouseLeave={() => setHoveredTech(null)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div
              className="text-4xl mb-2 transition-transform duration-300 group-hover:scale-125"
              style={{ color: tech.color }}
            >
              {tech.icon}
            </div>
            <span className="text-sm font-medium text-gray-300 group-hover:text-maize transition-colors duration-300">
              {tech.name}
            </span>
            {hoveredTech === tech.name && (
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-maize rounded-full animate-ping"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
