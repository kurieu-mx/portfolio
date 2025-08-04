"use client"

import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

const skillsData = [
  { name: "Python", level: 90, fill: "#FFCB05" },
  { name: "C++", level: 85, fill: "#FFCB05" },
  { name: "Go (Golang)", level: 80, fill: "#FFCB05" },
  { name: "OpenCV/Computer Vision", level: 85, fill: "#FFCB05" },
  { name: "Machine Learning/LLMs", level: 80, fill: "#FFCB05" },
  { name: "AWS/Firebase/SQL", level: 75, fill: "#FFCB05" },
]

const interests = [
  "Artificial Intelligence",
  "Machine Learning & LLMs",
  "Computer Vision",
  "Embedded Systems",
  "Robotics",
  "Camping & Outdoor Activities",
  "Movies & Cinema",
  "Mentoring & Teaching",
]

export function AboutMeSection() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  return (
    <section id="about" className="py-16 md:py-24 bg-dark-grey-900">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-maize">About Me</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Passionate about creating innovative solutions and pushing the boundaries of what's possible with code.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-300 leading-relaxed">
                Hello! I'm Eugenio Kuri, a passionate{" "}
                <span className="font-semibold text-maize">Data Science and Applied Mathematics</span> student at the{" "}
                <span className="font-semibold text-maize">University of Michigan</span>. Currently pursuing my B.S.E. 
                with an expected graduation in May 2028. Go Blue! 🏈
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                I specialize in building AI-powered applications and computer vision systems. Currently working as a{" "}
                <span className="font-semibold text-maize">Full-Stack AI & LLM developer (Part-Time) at Unif-AI</span> and{" "}
                <span className="font-semibold text-maize">Computer Vision Intern at Merlin Drones</span>, where I develop 
                custom LLMs, real-time CV systems, and scalable AI solutions using C++, Python, and Go.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                When I'm not coding, you can find me camping outdoors, watching movies (I even gave a{" "}
                <span className="font-semibold text-maize">TEDx Talk</span>!), or exploring the latest in AI and LLM 
                technologies. I'm fluent in both English and Spanish, and I love mentoring fellow students in robotics 
                and programming.
              </p>
            </div>

            <Card className="shadow-lg border-2 border-dark-grey-600 hover:border-maize/50 transition-all duration-300 bg-dark-grey-800">
              <CardHeader>
                <CardTitle className="text-maize">Professional Interests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-maize/20 text-maize hover:bg-maize hover:text-umich-blue-800 transition-all duration-300 cursor-pointer border border-maize/30"
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="shadow-lg border-2 border-dark-grey-600 hover:border-maize/50 transition-all duration-300 bg-dark-grey-800">
              <CardHeader>
                <CardTitle className="text-maize">Technical Skills</CardTitle>
                <p className="text-sm text-gray-400">Hover over bars to see proficiency levels</p>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    js: { label: "JavaScript/TypeScript", color: "#FFCB05" },
                    react: { label: "React/Next.js", color: "#FFCB05" },
                    node: { label: "Node.js", color: "#FFCB05" },
                    python: { label: "Python", color: "#FFCB05" },
                    db: { label: "SQL/NoSQL", color: "#FFCB05" },
                    cloud: { label: "Cloud (AWS/Vercel)", color: "#FFCB05" },
                  }}
                  className="min-h-[300px] w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={skillsData}
                      layout="vertical"
                      margin={{ left: 120, right: 20 }}
                      onMouseEnter={(data) => setHoveredSkill(data?.activeLabel || null)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <XAxis type="number" hide />
                      <YAxis
                        dataKey="name"
                        type="category"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        className="text-sm fill-gray-300"
                        tick={{ fill: "#D1D5DB" }}
                      />
                      <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                      <Bar dataKey="level" radius={5} className="transition-all duration-300" fill="#FFCB05" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-2 border-dark-grey-600 hover:border-maize/50 transition-all duration-300 bg-dark-grey-800">
              <CardHeader>
                <CardTitle className="text-maize">Education</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative pl-6 border-l-4 border-maize">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-maize rounded-full"></div>
                  <h3 className="font-semibold text-lg text-maize">University of Michigan</h3>
                  <p className="text-gray-300 font-medium">B.S.E. in Data Science and Applied Mathematics Minor</p>
                  <p className="text-sm text-gray-400">Ann Arbor, MI | August 2025 - Present</p>
                  <p className="text-sm text-gray-400 mt-2">
                    <strong className="text-maize">Current GPA:</strong> 3.68/4.0
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["Data Structures & Algorithms", "Multivariable Calculus", "Vector Calculus", "Discrete Mathematics", "Machine Learning"].map(
                      (course) => (
                        <Badge
                          key={course}
                          variant="outline"
                          className="border-maize text-maize text-xs bg-transparent"
                        >
                          {course}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
