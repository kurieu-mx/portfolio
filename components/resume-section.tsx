import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { DownloadIcon } from "lucide-react"

export function ResumeSection() {
  return (
    <section id="resume-download" className="py-16 md:py-24 bg-dark-grey-900">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-maize">Resume/CV</h2>
        <div className="max-w-3xl mx-auto space-y-8">
          <Card className="shadow-lg border-2 border-dark-grey-600 bg-dark-grey-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-maize">Download My Resume</CardTitle>
              <Link href="/Eugenio%20Kuri%20Resume%20%282%29.pdf" target="_blank" rel="noopener noreferrer" download="Eugenio Kuri Resume (2).pdf">
                <Button className="bg-maize text-umich-blue-800 hover:bg-maize-600">
                  <DownloadIcon className="h-4 w-4 mr-2" /> Download PDF
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">A detailed overview of my professional experience, skills, and education.</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-2 border-dark-grey-600 bg-dark-grey-800">
            <CardHeader>
              <CardTitle className="text-maize">Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg text-maize">Full-Stack AI & LLM Developer (Part-Time) | Unif-AI</h3>
                <p className="text-gray-400">May 2025 - Present (Promoted from Intern)</p>
                <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
                  <li>Develop custom AI tools and applications in C++ and Python for clients in fields such as law and accounting.</li>
                  <li>Build a web app for lawyers to process and generate legal documents, and an app for accountants to manage firm accountability.</li>
                  <li>Leverage technologies like Firebase, SQL, Pinecone, OpenAI APIs, and AWS to design and deploy scalable solutions.</li>
                  <li>Apply computer science and data science knowledge to improve document processing and information organization.</li>
                  <li>Design and fine-tune custom large language models (LLMs) for document processing, context handling, and information organization.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-maize">Go & Computer Vision Intern | Merlin Drones</h3>
                <p className="text-gray-400">February 2025 - Present</p>
                <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
                  <li>Built Go modules on Raspberry Pi for real-time computer vision vehicle detection.</li>
                  <li>Designed live display feed integrating detection results and GPS coordinates.</li>
                  <li>Optimized performance on resource-constrained embedded systems hardware.</li>
                  <li>Developed internal drone software tools combining computer vision and data processing.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-maize">Instructional Aide | Michigan Department of Robotics</h3>
                <p className="text-gray-400">January 2025 - Present</p>
                <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
                  <li>Assisted students in designing and building robots with guidance on robotics design.</li>
                  <li>Supported lab sessions by troubleshooting technical challenges.</li>
                  <li>Mentored students to foster hands-on problem-solving skills in robotics projects.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-2 border-dark-grey-600 bg-dark-grey-800">
            <CardHeader>
              <CardTitle className="text-maize">Skills & Certifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg text-maize">Programming Languages:</h3>
                <p className="text-gray-300">C++, Python, Go (Golang), JavaScript, SQL</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-maize">AI & Machine Learning:</h3>
                <p className="text-gray-300">OpenCV, Custom LLMs, Machine Learning, Computer Vision, OpenAI APIs</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-maize">Databases & Cloud:</h3>
                <p className="text-gray-300">SQL, Firebase, AWS, Pinecone (Vector Database)</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-maize">Embedded Systems & Hardware:</h3>
                <p className="text-gray-300">Raspberry Pi, Embedded Systems, Robotics, 3D Printing</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-maize">Languages:</h3>
                <p className="text-gray-300">English (Native), Spanish (Native)</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
