import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { GithubIcon, ExternalLinkIcon } from "lucide-react"

interface Project {
  id: number
  title: string
  description: string
  techStack: string[]
  imageUrl: string
  githubUrl: string
  demoUrl?: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A full-stack e-commerce application with user authentication, product listings, and a shopping cart.",
    techStack: ["Next.js", "React", "Tailwind CSS", "Stripe", "PostgreSQL"],
    imageUrl: "/placeholder.svg?height=400&width=600",
    githubUrl: "https://github.com/vercel/next.js",
    demoUrl: "#",
  },
  {
    id: 2,
    title: "AI Chatbot Integration",
    description: "Integrated a custom AI chatbot using OpenAI API for customer support on a web application.",
    techStack: ["Python", "Flask", "React", "OpenAI API", "Docker"],
    imageUrl: "/placeholder.svg?height=400&width=600",
    githubUrl: "https://github.com/vercel/next.js",
  },
  {
    id: 3,
    title: "Real-time Data Dashboard",
    description: "Developed a real-time dashboard visualizing sensor data from IoT devices using WebSockets.",
    techStack: ["Node.js", "Express", "Socket.IO", "D3.js", "MongoDB"],
    imageUrl: "/placeholder.svg?height=400&width=600",
    githubUrl: "https://github.com/vercel/next.js",
    demoUrl: "#",
  },
  {
    id: 4,
    title: "Mobile Recipe App",
    description: "A cross-platform mobile application for discovering and saving recipes, built with React Native.",
    techStack: ["React Native", "Firebase", "Redux"],
    imageUrl: "/placeholder.svg?height=400&width=600",
    githubUrl: "https://github.com/vercel/next.js",
  },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="py-16 md:py-24 bg-muted">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-umich-blue">My Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <Image
                src={project.imageUrl || "/placeholder.svg"}
                alt={project.title}
                width={600}
                height={400}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <CardTitle className="text-umich-blue">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-maize text-umich-blue text-xs font-medium px-2.5 py-0.5 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    className="border-umich-blue text-umich-blue hover:bg-umich-blue hover:text-maize bg-transparent"
                  >
                    <GithubIcon className="h-4 w-4 mr-2" /> GitHub
                  </Button>
                </Link>
                {project.demoUrl && (
                  <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <Button className="bg-umich-blue text-maize hover:bg-umich-blue/90">
                      <ExternalLinkIcon className="h-4 w-4 mr-2" /> Live Demo
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
