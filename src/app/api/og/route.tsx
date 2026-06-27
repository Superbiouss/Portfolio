import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title") || "PORTFOLIO";
    const desc = searchParams.get("desc") || "Full-Stack Software Engineer";

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#09090B",
            color: "#FAFAFA",
            fontFamily: "sans-serif",
            padding: "80px",
            border: "16px solid #3F3F46",
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
              AAKASH YADAV — PORTFOLIO
            </span>
            <h1
              style={{
                fontSize: 72,
                fontWeight: 900,
                lineHeight: 1.1,
                textTransform: "uppercase",
                letterSpacing: "-0.05em",
                color: "#FFFFFF",
                margin: 0,
                marginBottom: 30,
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: 28,
                color: "#A1A1AA", // muted foreground
                margin: 0,
                maxWidth: "900px",
                lineHeight: 1.4,
              }}
            >
              {desc}
            </p>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ padding: "12px 24px", border: "4px solid #DFE104", color: "#DFE104", fontWeight: 800, fontSize: 24 }}>
                VIEW DETAILS
              </div>
            </div>
            <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.05em", color: "#FFFFFF" }}>
              AAKASHYADAV.COM
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    const errorMsg = e instanceof Error ? e.message : "Unknown error";
    return new Response(`Failed to generate the image: ${errorMsg}`, {
      status: 500,
    });
  }
}
