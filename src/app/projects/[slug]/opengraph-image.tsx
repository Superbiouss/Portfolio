import { ImageResponse } from "next/og";
import { createClient } from "@/lib/supabase/server";

export const alt = "Project Case Study";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// A minimal fallback to ensure build succeeds and provides basic previews
const FALLBACK_PROJECTS: Record<string, { title: string; description: string; role: string }> = {
  "lawlens-ai": { title: "LawLens AI", description: "AI-powered legal document analysis platform.", role: "Full-Stack Developer" },
  "arcstone-studios": { title: "ArcStone Studios", description: "Premium creative agency website with kinetic typography.", role: "Lead Developer" },
};

export default async function Image(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  let project = FALLBACK_PROJECTS[slug] || { title: "Project Case Study", description: "Read the full case study.", role: "Developer" };

  try {
    const supabase = await createClient();
    const { data } = await supabase.from("projects").select("*").eq("slug", slug).single();
    if (data) project = data;
  } catch {
    // ignore
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0F0F0F",
          color: "#E2E8F0",
          fontFamily: "sans-serif",
          padding: "80px",
          border: "16px solid #27272A",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              color: "#DFE104", // accent color
              fontSize: 24,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 30,
            }}
          >
            {project.role?.toUpperCase() || "CASE STUDY"}
          </span>
          <h1
            style={{
              fontSize: 80,
              fontWeight: 900,
              lineHeight: 1,
              textTransform: "uppercase",
              letterSpacing: "-0.05em",
              color: "#FFFFFF",
              margin: 0,
              marginBottom: 30,
            }}
          >
            {project.title}
          </h1>
          <p
            style={{
              fontSize: 32,
              color: "#A1A1AA", // muted foreground
              margin: 0,
              maxWidth: "800px",
              lineHeight: 1.4,
            }}
          >
            {project.description}
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", gap: "16px" }}>
            <div style={{ padding: "12px 24px", border: "4px solid #DFE104", color: "#DFE104", fontWeight: 800, fontSize: 24 }}>
              READ MORE
            </div>
          </div>
          <div style={{ fontSize: 40, fontWeight: 900, letterSpacing: "-0.05em", color: "#FFFFFF" }}>
            PORTFOLIO
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
