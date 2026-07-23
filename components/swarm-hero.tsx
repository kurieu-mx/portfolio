"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowDownIcon, GithubIcon, LinkedinIcon, MailIcon } from "lucide-react"

const operatorPhotos = [
  { src: "/images/tedx-presentation.jpg", label: "TEDx SPEAKER" },
  { src: "/images/award-ceremony.jpg", label: "AWARD" },
  { src: "/images/graduation-speech.jpg", label: "LEADERSHIP" },
  { src: "/images/berlin-wall.jpg", label: "EXPLORER" },
  { src: "/images/martial-arts.jpg", label: "DISCIPLINE" },
  { src: "/images/canoeing-adventure.jpg", label: "OUTDOORS" },
]

interface Agent {
  x: number
  y: number
  vx: number
  vy: number
}

const MAIZE = "#FFCB05"

function SwarmCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const count = Math.max(24, Math.min(60, Math.round(width / 22)))
    const agents: Agent[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.4,
      vy: (Math.random() - 0.5) * 1.4,
    }))

    const mouse = { x: -9999, y: -9999, active: false }
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = true
    }
    const onLeave = () => {
      mouse.active = false
      mouse.x = -9999
      mouse.y = -9999
    }
    window.addEventListener("mousemove", onMove)
    canvas.addEventListener("mouseleave", onLeave)

    const NEIGHBOR = 90
    const SEP = 26
    const MAX_SPEED = 2.1

    const step = () => {
      ctx.clearRect(0, 0, width, height)

      // connection lines
      ctx.lineWidth = 1
      for (let i = 0; i < agents.length; i++) {
        for (let j = i + 1; j < agents.length; j++) {
          const dx = agents[i].x - agents[j].x
          const dy = agents[i].y - agents[j].y
          const d2 = dx * dx + dy * dy
          if (d2 < NEIGHBOR * NEIGHBOR) {
            const a = 0.12 * (1 - Math.sqrt(d2) / NEIGHBOR)
            ctx.strokeStyle = `rgba(255,203,5,${a})`
            ctx.beginPath()
            ctx.moveTo(agents[i].x, agents[i].y)
            ctx.lineTo(agents[j].x, agents[j].y)
            ctx.stroke()
          }
        }
      }

      for (const a of agents) {
        let ax = 0
        let ay = 0
        let cx = 0
        let cy = 0
        let vx = 0
        let vy = 0
        let n = 0
        for (const b of agents) {
          if (a === b) continue
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < NEIGHBOR * NEIGHBOR) {
            cx += b.x
            cy += b.y
            vx += b.vx
            vy += b.vy
            n++
            if (d2 < SEP * SEP && d2 > 0) {
              const d = Math.sqrt(d2)
              ax += dx / d
              ay += dy / d
            }
          }
        }
        if (n > 0) {
          // cohesion
          a.vx += (cx / n - a.x) * 0.0009
          a.vy += (cy / n - a.y) * 0.0009
          // alignment
          a.vx += (vx / n - a.vx) * 0.04
          a.vy += (vy / n - a.vy) * 0.04
        }
        // separation
        a.vx += ax * 0.05
        a.vy += ay * 0.05

        // collision avoidance around cursor
        if (mouse.active) {
          const dx = a.x - mouse.x
          const dy = a.y - mouse.y
          const d2 = dx * dx + dy * dy
          if (d2 < 130 * 130 && d2 > 0) {
            const d = Math.sqrt(d2)
            const f = (1 - d / 130) * 0.9
            a.vx += (dx / d) * f
            a.vy += (dy / d) * f
          }
        }

        const sp = Math.hypot(a.vx, a.vy)
        if (sp > MAX_SPEED) {
          a.vx = (a.vx / sp) * MAX_SPEED
          a.vy = (a.vy / sp) * MAX_SPEED
        }

        a.x += a.vx
        a.y += a.vy

        // wrap
        if (a.x < -10) a.x = width + 10
        if (a.x > width + 10) a.x = -10
        if (a.y < -10) a.y = height + 10
        if (a.y > height + 10) a.y = -10

        // draw agent as a small triangle pointing along velocity
        const ang = Math.atan2(a.vy, a.vx)
        ctx.save()
        ctx.translate(a.x, a.y)
        ctx.rotate(ang)
        ctx.fillStyle = MAIZE
        ctx.beginPath()
        ctx.moveTo(6, 0)
        ctx.lineTo(-4, 3)
        ctx.lineTo(-4, -3)
        ctx.closePath()
        ctx.fill()
        ctx.restore()
      }
    }

    let raf = 0
    const loop = () => {
      step()
      raf = requestAnimationFrame(loop)
    }

    if (reduce) {
      step()
    } else {
      raf = requestAnimationFrame(loop)
    }

    let resizeQueued = false
    const ro = new ResizeObserver(() => {
      if (resizeQueued) return
      resizeQueued = true
      requestAnimationFrame(() => {
        resize()
        resizeQueued = false
      })
    })
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", onMove)
      canvas.removeEventListener("mouseleave", onLeave)
      ro.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
}

export function SwarmHero() {
  const [text, setText] = useState("")
  const [photo, setPhoto] = useState(0)
  const full = "EUGENIO KURI"

  useEffect(() => {
    let i = 0
    const t = setInterval(() => {
      i += 1
      setText(full.slice(0, i))
      if (i >= full.length) clearInterval(t)
    }, 80)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setPhoto((p) => (p + 1) % operatorPhotos.length), 3500)
    return () => clearInterval(t)
  }, [])

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen overflow-hidden bg-[radial-gradient(circle_at_30%_20%,#0a2a4a,#050608_60%)] text-white"
    >
      <SwarmCanvas />

      {/* HUD grid + vignette */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(#FFCB05 1px, transparent 1px), linear-gradient(90deg, #FFCB05 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
        aria-hidden="true"
      />

      {/* Top HUD bar */}
      <div className="pointer-events-none absolute top-0 inset-x-0 flex items-center justify-between px-4 md:px-8 h-16 font-mono text-[11px] md:text-xs tracking-widest text-maize/70">
        <span>// GROUND CONTROL — PORTFOLIO</span>
        <span className="hidden sm:flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-maize animate-pulse" /> SYSTEMS NOMINAL
        </span>
      </div>

      {/* Corner brackets */}
      <div className="pointer-events-none absolute inset-4 md:inset-6" aria-hidden="true">
        <span className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-maize/40" />
        <span className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-maize/40" />
        <span className="absolute left-0 bottom-0 h-8 w-8 border-l-2 border-b-2 border-maize/40" />
        <span className="absolute right-0 bottom-0 h-8 w-8 border-r-2 border-b-2 border-maize/40" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="container px-6 md:px-10 grid lg:grid-cols-3 gap-10 items-center">
          <div className="lg:col-span-2 space-y-6">
            <p className="font-mono text-sm text-maize/80 tracking-[0.3em]">ROBOTICS · AUTONOMY · SYSTEMS</p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-maize">
              {text}
              <span className="ml-1 inline-block h-[0.85em] w-[3px] translate-y-1 bg-maize animate-blink align-middle" />
            </h1>
            <p className="max-w-2xl text-lg sm:text-xl text-white/80">
              I engineer <span className="text-maize font-semibold">autonomous drone swarms</span>, real-time edge
              computer vision, and high-performance backends in Go, C++, and Python.
            </p>

            {/* telemetry chips */}
            <div className="flex flex-wrap gap-2 font-mono text-[11px] md:text-xs">
              {[
                "SWARM: ONLINE",
                "COLLISION-AVOIDANCE: ACTIVE",
                "ROS 2 · PX4",
                "MODE: AUTONOMOUS",
              ].map((chip) => (
                <span key={chip} className="rounded border border-maize/30 bg-maize/5 px-3 py-1 text-maize/80">
                  {chip}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                onClick={() => scrollTo("projects")}
                className="bg-maize text-umich-blue-800 hover:bg-maize-600 rounded-none px-7 py-6 text-base font-semibold"
              >
                View Missions <ArrowDownIcon className="ml-2 h-4 w-4" />
              </Button>
              <Button
                onClick={() => scrollTo("contact")}
                variant="outline"
                className="rounded-none border-maize/60 bg-transparent px-7 py-6 text-base font-semibold text-maize hover:bg-maize hover:text-umich-blue-800"
              >
                Establish Contact
              </Button>
              <div className="flex items-center gap-4 pl-2">
                <a href="https://github.com/kurieu-mx" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-maize/70 hover:text-maize transition-colors">
                  <GithubIcon className="h-6 w-6" />
                </a>
                <a href="https://www.linkedin.com/in/kurieu/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-maize/70 hover:text-maize transition-colors">
                  <LinkedinIcon className="h-6 w-6" />
                </a>
                <a href="mailto:kurieu@umich.edu" aria-label="Email" className="text-maize/70 hover:text-maize transition-colors">
                  <MailIcon className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Operator ID panel */}
          <div className="hidden lg:block">
            <div className="relative ml-auto w-64 border border-maize/30 bg-black/40 backdrop-blur-sm p-4 font-mono">
              <div className="flex items-center justify-between text-[10px] tracking-widest text-maize/70">
                <span>OPERATOR ID</span>
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> ONLINE
                </span>
              </div>
              <div className="relative mt-3 aspect-square w-full overflow-hidden border border-maize/20">
                {operatorPhotos.map((p, i) => (
                  <Image
                    key={p.src}
                    src={p.src}
                    alt={p.label}
                    width={320}
                    height={320}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                      i === photo ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute bottom-2 left-2 text-[10px] tracking-widest text-maize">
                  {operatorPhotos[photo].label}
                </span>
              </div>
              <div className="mt-3 space-y-1 text-[11px] text-white/70">
                <div className="flex justify-between">
                  <span className="text-maize/60">NAME</span>Eugenio Kuri
                </div>
                <div className="flex justify-between">
                  <span className="text-maize/60">ROLE</span>SW / Robotics Eng.
                </div>
                <div className="flex justify-between">
                  <span className="text-maize/60">BASE</span>Ann Arbor, MI
                </div>
                <div className="flex justify-between">
                  <span className="text-maize/60">LANG</span>EN · ES
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollTo("projects")}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 font-mono text-[10px] tracking-widest text-maize/70 hover:text-maize transition-colors flex flex-col items-center gap-1"
        aria-label="Scroll to missions"
      >
        SCROLL
        <ArrowDownIcon className="h-4 w-4 animate-bounce" />
      </button>
    </section>
  )
}
