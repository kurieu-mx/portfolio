"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { HomeIcon, FolderIcon, UserIcon, FileTextIcon, MailIcon } from "lucide-react"

interface MenuItem {
  id: string
  label: string
  href: string
  icon: React.ReactNode
}

const menuItems: MenuItem[] = [
  {
    id: "hero",
    label: "Home",
    href: "#hero",
    icon: <HomeIcon className="w-5 h-5" />,
  },
  {
    id: "projects",
    label: "Projects",
    href: "#projects",
    icon: <FolderIcon className="w-5 h-5" />,
  },
  {
    id: "about",
    label: "About Me",
    href: "#about",
    icon: <UserIcon className="w-5 h-5" />,
  },
  {
    id: "resume",
    label: "Professional Timeline",
    href: "#resume",
    icon: <FileTextIcon className="w-5 h-5" />,
  },
  {
    id: "resume-download",
    label: "Resume/CV",
    href: "#resume-download",
    icon: <FileTextIcon className="w-5 h-5" />,
  },
  {
    id: "contact",
    label: "Contact",
    href: "#contact",
    icon: <MailIcon className="w-5 h-5" />,
  },
]

export function GlowMenu() {
  const [activeSection, setActiveSection] = useState("hero")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems.map((item) => item.id)
      const scrollPosition = window.scrollY + 200 // Offset for better detection

      let currentSection = "hero" // Default to hero

      // Check each section to see which one is currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = window.scrollY + rect.top

          // If we've scrolled past the top of this section, it's the active one
          if (scrollPosition >= elementTop) {
            currentSection = section
            break
          }
        }
      }

      setActiveSection(currentSection)
    }

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Call immediately to set initial state
    handleScroll()

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const scrollToSection = (href: string, sectionId: string) => {
    const targetId = href.replace("#", "")
    const element = document.getElementById(targetId)
    if (element) {
      // Immediately update active section for responsive feedback
      setActiveSection(sectionId)

      // Scroll to the element
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <div
      className="fixed top-1/2 right-4 transform -translate-y-1/2 z-50 hidden lg:block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative bg-dark-grey-900/80 backdrop-blur-md rounded-2xl border border-dark-grey-600 shadow-2xl transition-all duration-500 ${
          isHovered ? "p-2 w-auto" : "p-1 w-12"
        }`}
        onMouseMove={handleMouseMove}
        style={{
          background: isHovered
            ? `radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 203, 5, 0.1), transparent 40%)`
            : undefined,
        }}
      >
        {/* Glow effect overlay - only when hovered */}
        {isHovered && (
          <div
            className="absolute inset-0 rounded-2xl opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `radial-gradient(150px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 203, 5, 0.15), transparent 50%)`,
            }}
          />
        )}

        <nav className="relative z-10">
          <ul className={`transition-all duration-500 ${isHovered ? "space-y-2" : "space-y-1"}`}>
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.href, item.id)}
                  className={`group relative flex items-center rounded-xl transition-all duration-500 ease-out ${
                    isHovered
                      ? `w-full gap-3 px-4 py-3 transform translate-x-0 ${
                          activeSection === item.id
                            ? "bg-maize/20 text-maize shadow-lg shadow-maize/25"
                            : "text-gray-400 hover:text-maize hover:bg-maize/10"
                        }`
                      : `w-10 h-10 justify-center transform ${
                          activeSection === item.id
                            ? "bg-maize/30 text-maize shadow-lg shadow-maize/25"
                            : "text-gray-400 hover:text-maize hover:bg-maize/20"
                        }`
                  }`}
                  title={!isHovered ? item.label : undefined}
                >
                  {/* Active indicator - full width when hovered, dot when minimized */}
                  {activeSection === item.id && (
                    <div
                      className={`absolute bg-maize shadow-lg shadow-maize/50 transition-all duration-500 ease-out ${
                        isHovered
                          ? "left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 rounded-r-full opacity-100"
                          : "top-1 right-1 w-2 h-2 rounded-full opacity-80"
                      }`}
                    />
                  )}

                  {/* Icon */}
                  <div
                    className={`transition-all duration-300 ${
                      activeSection === item.id
                        ? "text-maize scale-110"
                        : "text-gray-400 group-hover:text-maize group-hover:scale-105"
                    } ${isHovered ? "" : "flex-shrink-0"}`}
                  >
                    {item.icon}
                  </div>

                  {/* Label - only visible when hovered */}
                  {isHovered && (
                    <span
                      className={`font-medium transition-all duration-500 ease-out opacity-100 transform translate-x-0 ${
                        activeSection === item.id ? "text-maize" : "text-gray-400 group-hover:text-maize"
                      }`}
                      style={{
                        transitionDelay: isHovered ? "200ms" : "0ms",
                      }}
                    >
                      {item.label}
                    </span>
                  )}

                  {/* Glow effect for active item */}
                  {activeSection === item.id && (
                    <div className="absolute inset-0 rounded-xl bg-maize/5 animate-pulse" />
                  )}

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-maize/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Border glow effect - only when hovered */}
        {isHovered && (
          <div className="absolute inset-0 rounded-2xl border border-maize/20 opacity-100 transition-all duration-500 ease-out pointer-events-none" />
        )}
      </div>

      {/* Floating particles effect - only when hovered */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-maize rounded-full animate-ping opacity-30"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 1.5}s`,
                animationDuration: `${2 + Math.random()}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
