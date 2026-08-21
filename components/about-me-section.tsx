"use client"

import { Bar, BarChart, XAxis, YAxis, LabelList } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SectionHeading } from "@/components/section-heading"
import { SectionFX } from "@/components/section-fx"
import { useIsMobile } from "@/hooks/use-mobile"

// `short` is used below the md breakpoint: the full labels need a 170px axis,
// which would leave almost no room for the bars on a phone.
const skillsData = [
  { name: "Python", short: "Python", level: 92, fill: "#FFCB05" },
  { name: "Go (Golang)", short: "Go", level: 88, fill: "#FFCB05" },
  { name: "C++", short: "C++", level: 88, fill: "#FFCB05" },
  { name: "Robotics (ROS 2 / PX4)", short: "Robotics", level: 85, fill: "#FFCB05" },
  { name: "Computer Vision (OpenCV / YOLO)", short: "Computer Vision", level: 85, fill: "#FFCB05" },
  { name: "Cloud & Data (GCP / BigQuery)", short: "Cloud & Data", level: 80, fill: "#FFCB05" },
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
  const isMobile = useIsMobile()
  const chartData = isMobile ? skillsData.map((d) => ({ ...d, name: d.short })) : skillsData

  return (
    <section id="about" className="hud-grid py-16 md:py-24 bg-dark-grey-900">
      <SectionFX variant="constellation" />
      <div className="container px-4 md:px-6">
        <SectionHeading
          index="02"
          eyebrow="PROFILE"
          title="About Me"
          subtitle="Software & AI engineer who likes hard problems across the stack — and shipping them."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="min-w-0 space-y-6">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-300 leading-relaxed">
                Hi, I&apos;m <span className="font-semibold text-maize">Eugenio Kuri</span> — a{" "}
                <span className="font-semibold text-maize">software &amp; AI engineer</span> who builds across the stack:
                machine learning and LLMs, full-stack applications, and autonomous systems — grounded in{" "}
                <span className="font-semibold text-maize">Data Science &amp; Applied Mathematics</span> at the
                University of Michigan. Go Blue! 〽️
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                I&apos;ve shipped <span className="font-medium text-white">LLM-powered products</span> (custom models,
                financial-automation pipelines, and recommendation systems at Embedding Labs and beyond),{" "}
                <span className="font-medium text-white">real-time computer vision</span>, and{" "}
                <span className="font-medium text-white">high-performance, autonomous systems</span> — including
                collision-avoidance for drone swarms in Go with ROS 2 and PX4. I like turning research-grade ideas into
                things people can actually use.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                I care about reliable systems, clean interfaces, and clear communication — I&apos;m a featured{" "}
                <span className="font-semibold text-maize">TEDx speaker</span>, I mentor fellow robotics students, and
                I&apos;m fluent in English and Spanish. Off the clock you&apos;ll find me camping or at the movies.
              </p>
            </div>

            <Card className="hud-panel shadow-lg border-2 border-dark-grey-600 hover:border-maize/50 transition-all duration-300 bg-dark-grey-800">
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

          <div className="min-w-0 space-y-8">
            <Card className="hud-panel shadow-lg border-2 border-dark-grey-600 hover:border-maize/50 transition-all duration-300 bg-dark-grey-800">
              <CardHeader>
                <CardTitle className="text-maize">Technical Skills</CardTitle>
                <p className="text-sm text-gray-400">Core areas I build with day to day</p>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{ level: { label: "Proficiency", color: "#FFCB05" } }}
                  className="min-h-[300px] w-full"
                >
                  <BarChart data={chartData} layout="vertical" margin={{ left: 8, right: isMobile ? 28 : 40 }}>
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis
                      dataKey="name"
                      type="category"
                      tickLine={false}
                      tickMargin={8}
                      axisLine={false}
                      width={isMobile ? 108 : 170}
                      tick={{ fill: "#D1D5DB", fontSize: isMobile ? 11 : 12 }}
                    />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Bar dataKey="level" radius={5} fill="#FFCB05">
                      <LabelList dataKey="level" position="right" className="fill-gray-400 text-xs" />
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="hud-panel shadow-lg border-2 border-dark-grey-600 hover:border-maize/50 transition-all duration-300 bg-dark-grey-800">
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
