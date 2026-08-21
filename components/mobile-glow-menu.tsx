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
    icon: <HomeIcon className="w-4 h-4" />,
  },
  {
    id: "projects",
    label: "Projects",
    href: "#projects",
    icon: <FolderIcon className="w-4 h-4" />,
  },
  {
    id: "about",
    label: "About",
    href: "#about",
    icon: <UserIcon className="w-4 h-4" />,
  },
  {
    id: "resume",
    label: "Timeline",
    href: "#resume",
    icon: <FileTextIcon className="w-4 h-4" />,
  },
  {
    id: "resume-download",
    label: "Resume",
    href: "#resume-download",
    icon: <FileTextIcon className="w-4 h-4" />,
  },
  {
    id: "contact",
    label: "Contact",
    href: "#contact",
    icon: <MailIcon className="w-4 h-4" />,
  },
]

export function MobileGlowMenu() {
  const [activeSection, setActiveSection] = useState("hero")

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
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 lg:hidden">
      <div className="bg-dark-grey-900/90 backdrop-blur-md rounded-2xl p-1 border border-dark-grey-600 shadow-2xl">
        <nav>
          <ul className="flex space-x-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.href, item.id)}
                  className={`group relative flex flex-col items-center gap-1 px-2 py-2 rounded-xl transition-all duration-300 ${
                    activeSection === item.id
                      ? "bg-maize/20 text-maize shadow-lg shadow-maize/25"
                      : "text-gray-400 hover:text-maize hover:bg-maize/10"
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`transition-all duration-300 ${
                      activeSection === item.id
                        ? "text-maize scale-110"
                        : "text-gray-400 group-hover:text-maize group-hover:scale-105"
                    }`}
                  >
                    {item.icon}
                  </div>

                  {/* Label */}
                  <span
                    className={`text-[11px] font-medium leading-tight whitespace-nowrap transition-all duration-300 ${
                      activeSection === item.id ? "text-maize" : "text-gray-400 group-hover:text-maize"
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Active indicator */}
                  {activeSection === item.id && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-maize rounded-b-full shadow-lg shadow-maize/50" />
                  )}

                  {/* Glow effect for active item */}
                  {activeSection === item.id && (
                    <div className="absolute inset-0 rounded-xl bg-maize/5 animate-pulse" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}
