import Link from "next/link"
import { GithubIcon, LinkedinIcon, MailIcon } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-dark-grey-950 text-white py-8 border-t border-dark-grey-700">
      <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
        <div className="flex gap-4">
          <Link
            href="https://github.com/vercel"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-maize transition-colors duration-300"
          >
            <GithubIcon className="h-6 w-6" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-maize transition-colors duration-300"
          >
            <LinkedinIcon className="h-6 w-6" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            href="mailto:your.email@example.com"
            className="text-gray-400 hover:text-maize transition-colors duration-300"
          >
            <MailIcon className="h-6 w-6" />
            <span className="sr-only">Email</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
