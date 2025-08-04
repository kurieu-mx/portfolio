"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ChevronDownIcon } from "lucide-react"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [text, setText] = useState("")
  const fullText = "Eugenio Kuri"
  const tagline = "Computer Science Student | Full-Stack Developer | AI & LLM Engineer"
  const [taglineText, setTaglineText] = useState("")

  useEffect(() => {
    let i = 0
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setText((prev) => prev + fullText.charAt(i))
        i++
      } else {
        clearInterval(typingInterval)
        let j = 0
        const taglineTypingInterval = setInterval(() => {
          if (j < tagline.length) {
            setTaglineText((prev) => prev + tagline.charAt(j))
            j++
          } else {
            clearInterval(taglineTypingInterval)
          }
        }, 50) // Adjust typing speed for tagline
      }
    }, 70) // Adjust typing speed for headline

    return () => {
      clearInterval(typingInterval)
      // Clear tagline interval if component unmounts before it finishes
    }
  }, [])

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="home"
      className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-umich-blue to-blue-950 text-white overflow-hidden"
    >
      {/* Subtle geometric pattern background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" className="text-maize" />
        </svg>
      </div>

      <div className="container px-4 md:px-6 text-center z-10">
        <div className="max-w-5xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-maize relative inline-block">
            <span className="overflow-hidden whitespace-nowrap border-r-4 border-maize pr-1 animate-typing">
              {text}
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl lg:text-2xl text-maize-foreground font-medium max-w-4xl mx-auto leading-relaxed">
            <span className="border-r-4 border-maize pr-1 animate-typing delay-1s inline-block">
              {taglineText}
            </span>
          </p>
          <div className="mt-8">
            <Button
              onClick={scrollToProjects}
              className="bg-maize text-umich-blue hover:bg-maize/90 px-8 py-3 text-lg font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105"
            >
              Explore My Work <ChevronDownIcon className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Placeholder for personal photo carousel */}
      <div className="absolute bottom-8 right-8 hidden lg:block z-10">
        <Image
          src="/placeholder.svg?height=150&width=150"
          width={150}
          height={150}
          alt="Personal Photo"
          className="rounded-full border-4 border-maize shadow-xl"
        />
      </div>
    </section>
  )
}
