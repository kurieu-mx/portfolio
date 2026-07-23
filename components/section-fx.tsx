"use client"

import { useEffect, useRef } from "react"

type Variant = "radar" | "constellation" | "rain" | "signal"

const MAIZE = "255,203,5"
const RAIN_CHARS = "01</>{}[]#*+=Δλ∑".split("")

/**
 * Immersive, section-specific animated background.
 * - Only animates while on screen (IntersectionObserver)
 * - Static single frame when the user prefers reduced motion
 * - Sits behind content (-z-10) and never intercepts pointer events
 * The parent must be a positioned element (the sections use `.hud-grid`,
 * which is position: relative).
 */
export function SectionFX({ variant }: { variant: Variant }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let w = 0
    let h = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.floor(w * dpr))
      canvas.height = Math.max(1, Math.floor(h * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    // ---- per-variant state ----
    const nodes = Array.from({ length: 44 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
    }))
    let cols = Math.max(8, Math.floor(w / 18))
    let drops = Array.from({ length: cols }, () => Math.random() * -h)
    const blips: { a: number; r: number; life: number }[] = []
    let t = 0

    const resetRain = () => {
      cols = Math.max(8, Math.floor(w / 18))
      drops = Array.from({ length: cols }, () => Math.random() * -h)
    }

    const radar = () => {
      const cx = w / 2
      const cy = h / 2
      const R = Math.min(w, h) * 0.62
      ctx.clearRect(0, 0, w, h)
      // rings
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath()
        ctx.arc(cx, cy, (R / 4) * i, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${MAIZE},0.07)`
        ctx.stroke()
      }
      ctx.strokeStyle = `rgba(${MAIZE},0.06)`
      ctx.beginPath()
      ctx.moveTo(cx - R, cy)
      ctx.lineTo(cx + R, cy)
      ctx.moveTo(cx, cy - R)
      ctx.lineTo(cx, cy + R)
      ctx.stroke()
      // sweep
      const ang = t * 0.012
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R)
      g.addColorStop(0, `rgba(${MAIZE},0.18)`)
      g.addColorStop(1, `rgba(${MAIZE},0)`)
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(ang)
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.arc(0, 0, R, -0.35, 0)
      ctx.closePath()
      ctx.fillStyle = g
      ctx.fill()
      ctx.strokeStyle = `rgba(${MAIZE},0.5)`
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(R, 0)
      ctx.stroke()
      ctx.restore()
      // blips
      if (Math.random() < 0.03) blips.push({ a: Math.random() * Math.PI * 2, r: Math.random() * R, life: 1 })
      for (let i = blips.length - 1; i >= 0; i--) {
        const b = blips[i]
        b.life -= 0.01
        if (b.life <= 0) {
          blips.splice(i, 1)
          continue
        }
        ctx.beginPath()
        ctx.arc(cx + Math.cos(b.a) * b.r, cy + Math.sin(b.a) * b.r, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${MAIZE},${b.life * 0.7})`
        ctx.fill()
      }
    }

    const constellation = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of nodes) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const d2 = dx * dx + dy * dy
          if (d2 < 130 * 130) {
            ctx.strokeStyle = `rgba(${MAIZE},${0.1 * (1 - Math.sqrt(d2) / 130)})`
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }
      for (const p of nodes) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${MAIZE},0.45)`
        ctx.fill()
      }
    }

    const rain = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.font = "14px var(--font-geist-mono), monospace"
      for (let i = 0; i < cols; i++) {
        const x = i * 18 + 4
        const y = drops[i]
        // trailing gradient
        const g = ctx.createLinearGradient(0, y - 90, 0, y)
        g.addColorStop(0, `rgba(${MAIZE},0)`)
        g.addColorStop(1, `rgba(${MAIZE},0.35)`)
        ctx.fillStyle = g
        for (let k = 6; k >= 1; k--) {
          ctx.fillText(RAIN_CHARS[(i + k + (t >> 3)) % RAIN_CHARS.length], x, y - k * 15)
        }
        ctx.fillStyle = `rgba(${MAIZE},0.55)`
        ctx.fillText(RAIN_CHARS[(i * 3 + (t >> 2)) % RAIN_CHARS.length], x, y)
        drops[i] += 2.2
        if (drops[i] > h + 40) drops[i] = Math.random() * -120
      }
    }

    const signal = () => {
      ctx.clearRect(0, 0, w, h)
      const cx = w / 2
      const cy = h / 2
      const maxR = Math.min(w, h) * 0.7
      ctx.strokeStyle = `rgba(${MAIZE},0.06)`
      ctx.beginPath()
      ctx.moveTo(cx - maxR, cy)
      ctx.lineTo(cx + maxR, cy)
      ctx.moveTo(cx, cy - maxR)
      ctx.lineTo(cx, cy + maxR)
      ctx.stroke()
      for (let k = 0; k < 4; k++) {
        const r = ((t * 0.8 + (k * maxR) / 4) % maxR)
        const alpha = 0.35 * (1 - r / maxR)
        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${MAIZE},${alpha})`
        ctx.lineWidth = 1.5
        ctx.stroke()
      }
      ctx.beginPath()
      ctx.arc(cx, cy, 3, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${MAIZE},0.6)`
      ctx.fill()
    }

    const draw = () => {
      t++
      if (variant === "radar") radar()
      else if (variant === "constellation") constellation()
      else if (variant === "rain") rain()
      else signal()
    }

    let raf = 0
    let running = false
    const loop = () => {
      draw()
      raf = requestAnimationFrame(loop)
    }
    const start = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (reduce) {
          if (e.isIntersecting) draw()
          return
        }
        if (e.isIntersecting) start()
        else stop()
      },
      { threshold: 0 },
    )
    io.observe(canvas)

    let queued = false
    const ro = new ResizeObserver(() => {
      if (queued) return
      queued = true
      requestAnimationFrame(() => {
        resize()
        resetRain()
        queued = false
      })
    })
    ro.observe(canvas)

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
    }
  }, [variant])

  return <canvas ref={ref} className="absolute inset-0 -z-10 h-full w-full pointer-events-none" aria-hidden="true" />
}
