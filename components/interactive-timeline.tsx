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
    title: "Full-Stack Development Intern",
    company: "Unif-AI",
    period: "May 2025 - Present",
    description: [
      "Used C++ and Python to build custom AI tools and applications for clients in law and accounting",
      "Created web apps for lawyers to process legal documents and accountants to manage firm accountability",
      "Worked with Firebase, SQL, Pinecone, OpenAI APIs, and AWS to build scalable solutions",
      "Applied computer science and data science knowledge to design custom LLMs for document processing",
    ],
    technologies: ["C++", "Python", "Firebase", "SQL", "Pinecone", "OpenAI APIs", "AWS"],
    type: "work",
  },
  {
    id: 2,
    title: "Go & Computer Vision Intern",
    company: "Merlin Drones",
    period: "February 2025 - Present",
    description: [
      "Built Go modules on Raspberry Pi for real-time computer vision vehicle detection",
      "Designed live display feed integrating detection results, GPS coordinates, and operational data",
      "Applied embedded systems knowledge to optimize performance on resource-constrained hardware",
      "Contributed to developing internal drone software tools combining CV and real-time visualization",
    ],
    technologies: ["Go", "OpenCV", "Raspberry Pi", "Computer Vision", "Embedded Systems"],
    type: "work",
  },
  {
    id: 3,
    title: "Instructional Aide",
    company: "Michigan Department of Robotics",
    period: "January 2025 - Present",
    description: [
      "Assisted students in designing and building robots with guidance on robotics and mechanical design",
      "Supported lab sessions by troubleshooting technical challenges and reinforcing course concepts",
      "Collaborated with instructor to improve course materials and enhance learning outcomes",
      "Mentored students to foster hands-on problem-solving skills and teamwork in robotics projects",
    ],
    technologies: ["Robotics", "Mechanical Design", "Systems Integration", "Mentoring"],
    type: "work",
  },
  {
    id: 4,
    title: "Full Stack Freelancing",
    company: "Francisco Iglesias Salon and Spa",
    period: "June 2025 - August 2025",
    description: [
      "Designed and managed frontend and backend of AI-powered hair consultation system",
      "Built and fine-tuned custom LLM to assess hair damage and recommend personalized treatments",
      "Achieved 15% increase in product sales and improved customer retention rates",
      "Delivered individualized recommendations and treatment plans through AI integration",
    ],
    technologies: ["Custom LLMs", "Full Stack Development", "AI Integration", "Product Recommendations"],
    type: "project",
  },
  {
    id: 5,
    title: "Wakey Wakey Robot Project",
    company: "University of Michigan Robotics Department",
    period: "August 2025 - December 2025",
    description: [
      "Designed and built system that tracks eye movements with OpenCV to detect student drowsiness",
      "Applied vector and linear mathematics to implement real-time detection logic",
      "Integrated computer vision, robotics, and 3D printing for interactive water-spraying response system",
      "Showcased skills in hardware-software integration and applied AI for real-world problem solving",
    ],
    technologies: ["OpenCV", "Computer Vision", "Robotics", "3D Printing", "Linear Mathematics"],
    type: "project",
  },
  {
    id: 6,
    title: "B.S.E. in Data Science and Applied Mathematics",
    company: "University of Michigan",
    period: "August 2025 - Present",
    description: [
      "Currently pursuing Bachelor's degree with Applied Mathematics Minor",
      "Current GPA: 3.68/4.0",
      "Relevant Coursework: Data Structures & Algorithms, Multivariable & Vector Calculus, Discrete Mathematics",
    ],
    technologies: ["Python", "C++", "Machine Learning", "Data Science", "Applied Mathematics"],
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
                className={`cursor-pointer transition-all duration-300 hover:shadow-xl border-2 bg-dark-grey-800 ${
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
