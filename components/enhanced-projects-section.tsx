"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { GithubIcon, ExternalLinkIcon, FilterIcon } from "lucide-react"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SectionHeading } from "@/components/section-heading"

interface Project {
  id: number
  title: string
  description: string
  techStack: string[]
  imageUrl?: string
  icon?: string
  githubUrl?: string
  demoUrl?: string
  category: string
  featured: boolean
  status?: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "Autonomous Drone Swarm",
    description:
      "Multi-layer collision-avoidance for autonomous drone swarms at Merlin Drones — built in Go with ROS 2, PX4, ORCA, and LiDAR, plus MAVLink mission workflows and a Gazebo CI/CD test harness.",
    techStack: ["Go", "ROS 2", "PX4", "MAVLink", "LiDAR", "Gazebo"],
    icon: "🚁",
    category: "Robotics",
    featured: true,
  },
  {
    id: 2,
    title: "AI Hair-Consultation System",
    description:
      "Full-stack freelance build for Francisco Iglesias Salon & Spa. A fine-tuned custom LLM assesses hair damage and recommends personalized product routines — driving a 15% increase in sales.",
    techStack: ["Custom LLMs", "Next.js", "AI Integration", "Python", "Machine Learning"],
    imageUrl: "/images/Hair.png",
    githubUrl: "https://github.com/kurieu-mx/ai-hair-consultation-platform",
    demoUrl: "https://v0-francisco-iglesias.vercel.app/",
    category: "Full Stack",
    featured: true,
  },
  {
    id: 3,
    title: "Wakey Wakey Robot",
    description:
      "A U-Michigan robotics build that tracks eye movements with OpenCV to detect drowsiness, using vector math for real-time detection and 3D printing for a water-spraying response system.",
    techStack: ["OpenCV", "Computer Vision", "Robotics", "3D Printing", "Python"],
    imageUrl: "/images/Sleep.png",
    githubUrl: "https://github.com/kurieu-mx/wakey_wakey",
    category: "Robotics",
    featured: true,
  },
  {
    id: 4,
    title: "AdHoc-GPT",
    description:
      "A transformer-based language model built from scratch — architecture, training, and tokenization — specialized for diplomatic dialogue, debate, and resolution drafting in Model UN scenarios.",
    techStack: ["Python", "Transformers", "PyTorch", "NLP", "Diplomatic AI", "MUN"],
    imageUrl: "/images/mun.png",
    githubUrl: "https://github.com/kurieu-mx/AdHoc-GPT",
    category: "AI/ML",
    featured: true,
    status: "IN PROGRESS",
  },
  {
    id: 5,
    title: "AI Bookkeeping Platform",
    description:
      "An automated bookkeeping platform at Embedding Labs that turns invoices and bank statements into double-entry journal entries, with LLM-assisted onboarding and Firestore/BigQuery/OpenAI pipelines.",
    techStack: ["Python", "Next.js", "BigQuery", "Firestore", "OpenAI API"],
    icon: "📒",
    category: "AI/ML",
    featured: true,
  },
  {
    id: 6,
    title: "AI Internship Scraper",
    description:
      "An LLM-powered ETL pipeline that filters ~15k community-sourced postings into a clean dataset of active US tech internships, with local-LLM classification and Google Sheets sync via GitHub Actions.",
    techStack: ["Python", "ETL", "Ollama", "Web Scraping", "GitHub Actions"],
    imageUrl: "/images/Scrapper.jpg",
    githubUrl: "https://github.com/kurieu-mx/Internship_Agreggation_Platform",
    category: "AI/ML",
    featured: false,
  },
]

const categories = ["All", "Robotics", "AI/ML", "Full Stack"]

export function EnhancedProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("featured")

  const filteredProjects = projects
    .filter((project) => selectedCategory === "All" || project.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === "featured") return Number(b.featured) - Number(a.featured)
      return a.title.localeCompare(b.title)
    })

  return (
    <section id="projects" className="hud-grid py-16 md:py-24 bg-dark-grey-800">
      <div className="container px-4 md:px-6">
        <SectionHeading
          index="01"
          eyebrow="MISSIONS"
          title="Projects"
          subtitle="From autonomous robotics and computer vision to full-stack AI applications."
        />

        {/* Filter and sort controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center items-center">
          <div className="flex gap-2 flex-wrap justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-maize text-umich-blue-800 hover:bg-maize-600"
                    : "border-maize text-maize hover:bg-maize hover:text-umich-blue-800 bg-transparent"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="border-maize text-maize hover:bg-maize hover:text-umich-blue-800 bg-transparent"
              >
                <FilterIcon className="h-4 w-4 mr-2" />
                Sort by: {sortBy === "featured" ? "Featured" : "Name"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-dark-grey-800 border-dark-grey-600">
              <DropdownMenuItem
                onClick={() => setSortBy("featured")}
                className="text-white hover:bg-maize hover:text-umich-blue-800"
              >
                Featured First
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSortBy("name")}
                className="text-white hover:bg-maize hover:text-umich-blue-800"
              >
                Alphabetical
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const hasGithub = Boolean(project.githubUrl) && project.githubUrl !== "#"
            const hasDemo = Boolean(project.demoUrl) && project.demoUrl !== "#"
            return (
              <Card
                key={project.id}
                className="hud-panel group flex flex-col overflow-hidden shadow-lg transition-all duration-500 border-2 border-dark-grey-600 hover:border-maize/50 hover:shadow-2xl hover:-translate-y-1 bg-dark-grey-900"
              >
                <div className="relative overflow-hidden h-48">
                  {project.imageUrl ? (
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-48 flex items-center justify-center bg-gradient-to-br from-umich-blue via-dark-grey-800 to-dark-grey-950">
                      <span className="text-6xl transition-transform duration-500 group-hover:scale-110" aria-hidden="true">
                        {project.icon}
                      </span>
                    </div>
                  )}

                  <div className="absolute top-2 right-2 flex gap-2">
                    {project.featured && <Badge className="bg-maize text-umich-blue-800">Featured</Badge>}
                    {project.status && <Badge className="bg-orange-500 text-white">{project.status}</Badge>}
                  </div>

                  {(hasGithub || hasDemo) && (
                    <div className="absolute inset-0 bg-gradient-to-t from-umich-blue-800/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <div className="flex gap-2">
                        {hasGithub && (
                          <Link href={project.githubUrl!} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} source code on GitHub`}>
                            <Button size="sm" variant="secondary" className="bg-maize text-umich-blue-800 hover:bg-maize-600">
                              <GithubIcon className="h-4 w-4" />
                            </Button>
                          </Link>
                        )}
                        {hasDemo && (
                          <Link href={project.demoUrl!} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} live demo`}>
                            <Button size="sm" variant="secondary" className="bg-maize text-umich-blue-800 hover:bg-maize-600">
                              <ExternalLinkIcon className="h-4 w-4" />
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <CardHeader>
                  <CardTitle className="text-maize group-hover:text-maize-600 transition-colors duration-300">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3 text-gray-300">{project.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="bg-maize/20 text-maize hover:bg-maize hover:text-umich-blue-800 transition-colors duration-300"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                {(hasGithub || hasDemo) && (
                  <CardFooter className="flex justify-between gap-2">
                    {hasGithub && (
                      <Link href={project.githubUrl!} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button
                          variant="outline"
                          className="w-full border-maize text-maize hover:bg-maize hover:text-umich-blue-800 transition-all duration-300 bg-transparent"
                        >
                          <GithubIcon className="h-4 w-4 mr-2" /> Code
                        </Button>
                      </Link>
                    )}
                    {hasDemo && (
                      <Link href={project.demoUrl!} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button className="w-full bg-maize text-umich-blue-800 hover:bg-maize-600 transition-all duration-300">
                          <ExternalLinkIcon className="h-4 w-4 mr-2" /> Demo
                        </Button>
                      </Link>
                    )}
                  </CardFooter>
                )}
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
