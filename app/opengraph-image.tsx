import { ImageResponse } from "next/og"

// Generate on-demand at the edge (the documented, most reliable runtime for
// next/og) instead of during the build, so it never blocks a deployment.
export const runtime = "edge"

export const alt = "Eugenio Kuri — Data Science & AI"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// Branded social-preview card shown when the site is shared (Twitter/X, LinkedIn,
// iMessage, Slack, etc.). Rendered on request — no external assets.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a0a 0%, #00274C 100%)",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "32px" }}>
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "16px",
              background: "#FFCB05",
              color: "#00274C",
              fontSize: "40px",
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            EK
          </div>
          <div style={{ color: "#FFCB05", fontSize: "28px", fontWeight: 600 }}>Robotics & Software Engineer</div>
        </div>

        <div style={{ color: "#FFCB05", fontSize: "88px", fontWeight: 800, lineHeight: 1.05 }}>Eugenio Kuri</div>

        <div style={{ color: "#E5E7EB", fontSize: "36px", marginTop: "24px", maxWidth: "900px" }}>
          Autonomous Drone Swarms · Edge Computer Vision · Distributed Systems
        </div>

        <div style={{ display: "flex", gap: "16px", marginTop: "48px" }}>
          {["Go", "ROS 2", "PX4", "OpenCV", "Python"].map((t) => (
            <div
              key={t}
              style={{
                border: "2px solid rgba(255,203,5,0.5)",
                color: "#FFCB05",
                borderRadius: "999px",
                padding: "10px 24px",
                fontSize: "26px",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  )
}
