"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { GithubIcon, LinkedinIcon, MailIcon, SendIcon, CheckCircleIcon, LoaderIcon } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { SectionFX } from "@/components/section-fx"

// Set NEXT_PUBLIC_FORMSPREE_ENDPOINT (e.g. "https://formspree.io/f/abcdwxyz")
// in your Vercel project env vars to deliver messages to your inbox. Until it's
// set, the form gracefully falls back to opening the visitor's email client.
const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || ""
const CONTACT_EMAIL = "kurieu@umich.edu"

type Status = "idle" | "submitting" | "success" | "error"

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle")
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Fallback: no backend configured → open the visitor's email client.
    if (!FORMSPREE_ENDPOINT) {
      const subject = encodeURIComponent(`Portfolio message from ${form.name || "someone"}`)
      const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} (${form.email})`)
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
      return
    }

    try {
      setStatus("submitting")
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("Request failed")
      setStatus("success")
      setForm({ name: "", email: "", message: "" })
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="hud-grid py-16 md:py-24 bg-dark-grey-800">
      <SectionFX variant="signal" />
      <div className="container px-4 md:px-6">
        <SectionHeading
          index="06"
          eyebrow="UPLINK"
          title="Establish Contact"
          subtitle="Open to internships, research, and collaborations in robotics, autonomous systems, and AI. Drop me a message — I'll get back to you."
        />

        <div className="grid lg:grid-cols-5 gap-8 max-w-4xl mx-auto">
          <Card className="hud-panel lg:col-span-3 shadow-lg border-2 border-dark-grey-600 bg-dark-grey-900">
            <CardHeader>
              <CardTitle className="text-maize">Send a message</CardTitle>
            </CardHeader>
            <CardContent>
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-10 text-center gap-3">
                  <CheckCircleIcon className="h-12 w-12 text-maize" />
                  <p className="text-lg font-semibold text-white">Thanks — your message is on its way!</p>
                  <p className="text-gray-400">I&apos;ll reply to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-300">
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="bg-dark-grey-800 border-dark-grey-600 text-white placeholder:text-gray-500 focus-visible:ring-maize"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="bg-dark-grey-800 border-dark-grey-600 text-white placeholder:text-gray-500 focus-visible:ring-maize"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-300">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about the opportunity or idea…"
                      className="bg-dark-grey-800 border-dark-grey-600 text-white placeholder:text-gray-500 focus-visible:ring-maize"
                    />
                  </div>
                  {status === "error" && (
                    <p className="text-sm text-red-400">Something went wrong. Please email me directly instead.</p>
                  )}
                  <Button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full bg-maize text-umich-blue-800 hover:bg-maize-600 font-semibold"
                  >
                    {status === "submitting" ? (
                      <>
                        <LoaderIcon className="h-4 w-4 mr-2 animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        <SendIcon className="h-4 w-4 mr-2" /> Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          <Card className="hud-panel lg:col-span-2 shadow-lg border-2 border-dark-grey-600 bg-dark-grey-900">
            <CardHeader>
              <CardTitle className="text-maize">Other ways to reach me</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-3 text-gray-300 hover:text-maize transition-colors"
              >
                <MailIcon className="h-5 w-5 shrink-0" />
                <span className="break-all">{CONTACT_EMAIL}</span>
              </a>
              <a
                href="https://github.com/kurieu-mx"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-300 hover:text-maize transition-colors"
              >
                <GithubIcon className="h-5 w-5 shrink-0" />
                <span>github.com/kurieu-mx</span>
              </a>
              <a
                href="https://www.linkedin.com/in/kurieu/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-300 hover:text-maize transition-colors"
              >
                <LinkedinIcon className="h-5 w-5 shrink-0" />
                <span>LinkedIn</span>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
