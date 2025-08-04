"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ChevronDownIcon, CodeIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { useEffect, useState } from "react"

const personalImages = [
  {
    src: "/images/award-ceremony.jpg",
    alt: "Award Ceremony - Academic Achievement",
    title: "Academic Excellence",
  },
  {
    src: "/images/berlin-wall.jpg",
    alt: "Exploring Berlin Wall - Travel & Culture",
    title: "Explorer",
  },
  {
    src: "/images/canoeing-adventure.jpg",
    alt: "Canoeing Adventure - Outdoor Activities",
    title: "Adventure Seeker",
  },
  {
    src: "/images/tedx-presentation.jpg",
    alt: "TEDx Presentation - Public Speaking",
    title: "Leader",
  },
  {
    src: "/images/graduation-group.jpg",
    alt: "Graduation Group Photo - University of Michigan",
    title: "Perserverent",
  },
  {
    src: "/images/martial-arts.jpg",
    alt: "Martial Arts Competition - Sports Achievement",
    title: "Discplined",
  },
  {
    src: "/images/graduation-speech.jpg",
    alt: "Graduation Speech - Leadership",
    title: "Student Leader",
  },
]

const codeSnippets = [
  "const developer = 'passionate';",
  "function solve(problem) { return innovation; }",
  "while(learning) { skills++; }",
  "import success from 'hardwork';",
  "const future = await buildSomethingAmazing();",
]

const FloatingCodeSnippet = ({ snippet, delay }: { snippet: string; delay: number }) => {
  return (
    <div
      className="absolute text-maize/30 text-sm font-mono animate-pulse pointer-events-none"
      style={{
        left: `${Math.random() * 80 + 10}%`,
        top: `${Math.random() * 80 + 10}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${3 + Math.random() * 2}s`,
      }}
    >
      {snippet}
    </div>
  )
}

export function EnhancedHeroSection() {
  const [text, setText] = useState("")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const fullText = "Eugenio Kuri"
  const tagline = "Data Science & Applied Mathematics Student | Full-Stack Developer | AI & Computer Vision Engineer"
  const [taglineText, setTaglineText] = useState("")

  // Image carousel effect
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % personalImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  // Typing effect
  useEffect(() => {
    // Reset states first
    setText("")
    setTaglineText("")

    let i = 0
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(typingInterval)
        // Start tagline typing after a brief pause
        setTimeout(() => {
          let j = 0
          const taglineTypingInterval = setInterval(() => {
            if (j < tagline.length) {
              setTaglineText(tagline.slice(0, j + 1))
              j++
            } else {
              clearInterval(taglineTypingInterval)
            }
          }, 50)
        }, 500) // 500ms pause between headline and tagline
      }
    }, 100) // Slightly slower typing for better visibility

    return () => clearInterval(typingInterval)
  }, [fullText, tagline]) // Add dependencies to re-run when text changes

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % personalImages.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000) // Resume auto-play after 10 seconds
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + personalImages.length) % personalImages.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000) // Resume auto-play after 10 seconds
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000) // Resume auto-play after 10 seconds
  }

  return (
    <section
      id="hero"
      className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-dark-grey-900 via-umich-blue-800 to-dark-grey-950 text-white overflow-hidden"
    >
      {/* Animated geometric background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-maize/10 to-transparent animate-pulse"></div>
        <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#FFCB05" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Floating geometric shapes */}
        <div
          className="absolute top-20 left-20 w-4 h-4 bg-maize/30 rotate-45 animate-bounce"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-40 right-32 w-6 h-6 bg-maize/40 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-32 left-40 w-3 h-3 bg-maize/35 animate-ping"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 right-20 w-5 h-5 bg-maize/30 rotate-12 animate-bounce"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      {/* Floating code snippets */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {codeSnippets.map((snippet, index) => (
          <FloatingCodeSnippet key={index} snippet={snippet} delay={index * 0.8} />
        ))}
      </div>

      <div className="container px-4 md:px-6 z-20 relative h-full flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-center">
          {/* Top section - Text content */}
          <div className="text-center space-y-6 mb-16">
            <div className="flex items-center justify-center mb-6">
              <CodeIcon className="h-10 w-10 text-maize mr-3 animate-spin" style={{ animationDuration: "3s" }} />
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-maize">
                <span className="inline-block overflow-hidden whitespace-nowrap border-r-4 border-maize pr-1">
                  {text}
                </span>
              </h1>
            </div>

            <p className="text-lg sm:text-xl md:text-2xl text-white font-medium max-w-3xl mx-auto">
              <span className="inline-block overflow-hidden whitespace-nowrap border-r-4 border-maize pr-1">
                {taglineText}
              </span>
            </p>
          </div>

          {/* Middle section - Image Carousel */}
          <div className="flex justify-center mb-16">
            <div
              className="relative group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Main carousel container */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                {/* Glowing border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-maize via-maize-400 to-maize rounded-full opacity-75 blur-sm group-hover:opacity-100 group-hover:blur-md transition-all duration-500"></div>

                {/* Image container */}
                <div className="relative w-full h-full bg-dark-grey-800 rounded-full overflow-hidden border-4 border-maize shadow-2xl group-hover:shadow-maize/50 transition-all duration-500">
                  {personalImages.map((image, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-1000 ${
                        index === currentImageIndex ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-95 rotate-3"
                      }`}
                    >
                      <Image
                        src={image.src || "/placeholder.svg"}
                        width={400}
                        height={400}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        crossOrigin="anonymous"
                      />
                      {/* Overlay with title */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-t from-umich-blue-800/80 via-transparent to-transparent flex items-end justify-center pb-6 transition-opacity duration-300 ${
                          isHovered ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <span className="text-maize font-semibold text-lg px-4 py-2 bg-umich-blue-800/50 rounded-full backdrop-blur-sm">
                          {image.title}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Navigation arrows */}
                <button
                  onClick={prevImage}
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 bg-maize/20 hover:bg-maize/40 text-maize p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                    isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                  }`}
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 bg-maize/20 hover:bg-maize/40 text-maize p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                    isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
                  }`}
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </button>

                {/* Floating indicators */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
                  {personalImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                        index === currentImageIndex
                          ? "bg-maize shadow-lg shadow-maize/50"
                          : "bg-maize/30 hover:bg-maize/60"
                      }`}
                    />
                  ))}
                </div>

                {/* Progress ring */}
                <div className="absolute -inset-2">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255, 203, 5, 0.2)" strokeWidth="1" />
                    <circle
                      cx="50"
                      cy="50"
                      r="48"
                      fill="none"
                      stroke="#FFCB05"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray={`${(currentImageIndex + 1) * (301.59 / personalImages.length)} 301.59`}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                </div>
              </div>

              {/* Floating particles effect */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute w-1 h-1 bg-maize rounded-full animate-ping transition-opacity duration-500 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                      animationDelay: `${i * 0.3}s`,
                      animationDuration: `${2 + Math.random()}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom section - Call to Action */}
          <div className="text-center">
            <Button
              onClick={scrollToProjects}
              className="bg-maize text-umich-blue-800 hover:bg-maize-600 px-8 py-4 text-lg font-semibold rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-maize/25"
            >
              Explore My Work <ChevronDownIcon className="ml-2 h-5 w-5 animate-bounce" />
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDownIcon className="h-8 w-8 text-maize" />
      </div>
    </section>
  )
}
