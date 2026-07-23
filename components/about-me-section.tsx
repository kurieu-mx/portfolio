"use client"

import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, LabelList } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const skillsData = [
  { name: "Python", level: 92, fill: "#FFCB05" },
  { name: "Go (Golang)", level: 88, fill: "#FFCB05" },
  { name: "C++", level: 88, fill: "#FFCB05" },
  { name: "Robotics (ROS 2 / PX4)", level: 85, fill: "#FFCB05" },
  { name: "Computer Vision (OpenCV / YOLO)", level: 85, fill: "#FFCB05" },
  { name: "Cloud & Data (GCP / BigQuery)", level: 80, fill: "#FFCB05" },
]

const interests = [
  "Autonomous Systems",
  "Robotics & Drones",
  "Computer Vision",
  "Distributed Systems",
  "Edge AI",
  "Machine Learning & LLMs",
  "Public Speaking (TEDx)",
  "Mentoring & Teaching",
  "Camping & Outdoors",
]

const coursework = [
  "Data Structures & Algorithms",
  "Multivariable & Vector Calculus",
  "Discrete Mathematics",
  "Machine Learning",
  "Applied Mathematics",
]

export function AboutMeSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-dark-grey-900">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <p className="text-maize/70 font-medium tracking-widest uppercase text-sm">Get to know me</p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 bg-gradient-to-r from-maize to-maize-300 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mt-4">
            Robotics &amp; software engineer who likes hard systems problems — and shipping them.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-300 leading-relaxed">
                Hi, I&apos;m <span className="font-semibold text-maize">Eugenio Kuri</span> — a software engineer
                specializing in{" "}
                <span className="font-semibold text-maize">robotics, autonomous systems, and high-performance
                backends</span>, built on a foundation in{" "}
                <span className="font-semibold text-maize">Data Science &amp; Applied Mathematics</span> at the
                University of Michigan. Go Blue! 〽️
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Lately I&apos;ve been building{" "}
                <span className="font-medium text-white">collision-avoidance for autonomous drone swarms</span> in Go
                (ROS 2, PX4, ORCA, LiDAR), <span className="font-medium text-white">real-time edge perception</span> on
                Raspberry Pi CM4 with YOLO/ONNX and OpenCV, and{" "}
                <span className="font-medium text-white">automated distributed systems</span> in Go, C++, and Python.
                Before that I engineered LLM-assisted financial-automation pipelines at Embedding Labs.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                I care about reliable systems, clean interfaces, and clear communication — I&apos;m a featured{" "}
                <span className="font-semibold text-maize">TEDx speaker</span>, I mentor fellow robotics students, and
                I&apos;m fluent in English and Spanish. Off the clock you&apos;ll find me camping or at the movies.
              </p>
            </div>

            <Card className="shadow-lg border-2 border-dark-grey-600 hover:border-maize/50 transition-all duration-300 bg-dark-grey-800">
              <CardHeader>
                <CardTitle className="text-maize">Interests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <Badge
                      key={interest}
                      variant="secondary"
                      className="bg-maize/10 text-maize hover:bg-maize hover:text-umich-blue-800 transition-all duration-300 border border-maize/30"
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
                <p className="text-sm text-gray-400">Core areas I build with day to day</p>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{ level: { label: "Proficiency", color: "#FFCB05" } }}
                  className="min-h-[300px] w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={skillsData} layout="vertical" margin={{ left: 8, right: 40 }}>
                      <XAxis type="number" domain={[0, 100]} hide />
                      <YAxis
                        dataKey="name"
                        type="category"
                        tickLine={false}
                        tickMargin={8}
                        axisLine={false}
                        width={170}
                        tick={{ fill: "#D1D5DB", fontSize: 12 }}
                      />
                      <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                      <Bar dataKey="level" radius={5} fill="#FFCB05">
                        <LabelList dataKey="level" position="right" className="fill-gray-400 text-xs" />
                      </Bar>
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
                  <p className="text-gray-300 font-medium">B.S.E. in Data Science · Minor in Applied Mathematics</p>
                  <p className="text-sm text-gray-400">Ann Arbor, MI</p>
                  <p className="text-sm text-gray-400 mt-2">
                    <strong className="text-maize">GPA:</strong> 3.68 / 4.0
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {coursework.map((course) => (
                      <Badge key={course} variant="outline" className="border-maize/60 text-maize text-xs bg-transparent">
                        {course}
                      </Badge>
                    ))}
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
