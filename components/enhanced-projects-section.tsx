"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { GithubIcon, ExternalLinkIcon, FilterIcon } from "lucide-react"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Project {
  id: number
  title: string
  description: string
  techStack: string[]
  imageUrl: string
  githubUrl: string
  demoUrl?: string
  category: string
  featured: boolean
}

const projects: Project[] = [
  {
    id: 1,
    title: "AI-Powered Hair Consultation System",
    description:
      "Full-stack freelancing project for Francisco Iglesias Salon and Spa. Built and fine-tuned a custom LLM to assess hair damage and recommend personalized product combinations, achieving 15% increase in sales.",
    techStack: ["Custom LLMs", "Full Stack Development", "AI Integration", "Python", "Machine Learning"],
    imageUrl: "/images/Hair.png",
    githubUrl: "#",
    demoUrl: "https://v0-francisco-iglesias.vercel.app/",
    category: "Full Stack",
    featured: true,
  },
  {
    id: 2,
    title: "Wakey Wakey Robot",
    description:
      "University of Michigan Robotics project that tracks eye movements with OpenCV to detect student drowsiness. Applied vector and linear mathematics for real-time detection, integrated with 3D printing for water-spraying response system.",
    techStack: ["OpenCV", "Computer Vision", "Robotics", "3D Printing", "Linear Mathematics", "Python"],
    imageUrl: "/images/Sleep.png",
    githubUrl: "https://github.com/kurieu-mx/wakey_wakey",
    category: "Robotics",
    featured: true,
  },
  {
    id: 3,
    title: "AI Internship Scraper",
    description:
      "A custom LLM-powered web scraper that automatically searches and filters internship opportunities across the internet based on personalized criteria.",
    techStack: ["Python", "OpenAI API", "Beautiful Soup", "Selenium", "Machine Learning", "Web Scraping"],
    imageUrl: "/images/Scrapper.jpg",
    githubUrl: "https://github.com/kurieu-mx/Internship_scrapper",
    demoUrl: "#",
    category: "AI/ML",
    featured: true,
  },
  {
    id: 4,
    title: "Coming Soon!",
    description:
      "Exciting new project in development. Stay tuned for updates on this upcoming addition to my portfolio.",
    techStack: ["Coming Soon"],
    imageUrl: "/images/ComingSoon.png",
    githubUrl: "#",
    category: "Mobile",
    featured: false,
  },
  {
    id: 5,
    title: "Coming Soon!",
    description:
      "Exciting new project in development. Stay tuned for updates on this upcoming addition to my portfolio.",
    techStack: ["Coming Soon"],
    imageUrl: "/images/ComingSoon.png",
    githubUrl: "#",
    category: "Blockchain",
    featured: false,
  },
  {
    id: 6,
    title: "Coming Soon!",
    description:
      "Exciting new project in development. Stay tuned for updates on this upcoming addition to my portfolio.",
    techStack: ["Coming Soon"],
    imageUrl: "/images/ComingSoon.png",
    githubUrl: "#",
    category: "Full Stack",
    featured: false,
  },
]

const categories = ["All", "Full Stack", "AI/ML", "Robotics", "Mobile", "Blockchain"]

export function EnhancedProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("featured")

  const filteredProjects = projects
    .filter((project) => selectedCategory === "All" || project.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === "featured") {
        return b.featured ? 1 : -1
      }
      return a.title.localeCompare(b.title)
    })

  return (
    <section id="projects" className="py-16 md:py-24 bg-dark-grey-800">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-maize">My Projects</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A showcase of my technical expertise across various domains, from full-stack applications to AI
            integrations.
          </p>
        </div>

        {/* Filter and Sort Controls */}
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
          {filteredProjects.map((project, index) => (
            <Card
              key={project.id}
              className="group flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border-2 border-dark-grey-600 hover:border-maize/50 bg-dark-grey-900"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={project.imageUrl || "/placeholder.svg"}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110 opacity-80"
                />
                {project.featured && (
                  <Badge className="absolute top-2 right-2 bg-maize text-umich-blue-800">Featured</Badge>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-umich-blue-800/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <div className="flex gap-2">
                    {project.id !== 1 && (
                      <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="secondary" className="bg-maize text-umich-blue-800 hover:bg-maize-600">
                          <GithubIcon className="h-4 w-4" />
                        </Button>
                      </Link>
                    )}
                    {project.demoUrl && project.id !== 3 && (
                      <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-maize text-umich-blue-800 hover:bg-maize-600"
                        >
                          <ExternalLinkIcon className="h-4 w-4" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-maize group-hover:text-maize-600 transition-colors duration-300">
                  {project.title}
                </CardTitle>
                <CardDescription className="line-clamp-3 text-gray-300">{project.description}</CardDescription>
              </CardHeader>

              <CardContent className="flex-1">
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-maize/20 text-maize hover:bg-maize hover:text-umich-blue-800 transition-colors duration-300"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="flex justify-between gap-2">
                {project.id !== 1 && (
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full border-maize text-maize hover:bg-maize hover:text-umich-blue-800 transition-all duration-300 bg-transparent"
                    >
                      <GithubIcon className="h-4 w-4 mr-2" /> Code
                    </Button>
                  </Link>
                )}
                {project.demoUrl && project.id !== 3 && (
                  <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button className="w-full bg-maize text-umich-blue-800 hover:bg-maize-600 transition-all duration-300">
                      <ExternalLinkIcon className="h-4 w-4 mr-2" /> Demo
                    </Button>
                  </Link>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
