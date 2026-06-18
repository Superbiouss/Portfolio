import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TopBar } from "@/components/layout/top-bar";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Footer } from "@/components/layout/footer";
import { NoiseTexture } from "@/components/ui/noise-texture";
import { CommandMenu } from "@/components/ui/command-menu";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Aakash Yadav — Full-Stack Developer & Engineer",
    template: "%s | Aakash Yadav",
  },
  description:
    "Full-stack developer specializing in modern web applications, AI-powered solutions, and scalable architectures. View projects, skills, and engineering case studies.",
  metadataBase: new URL("https://aakashyadav.com"),
  openGraph: {
    title: "Aakash Yadav — Full-Stack Developer & Engineer",
    description:
      "Full-stack developer specializing in modern web applications, AI-powered solutions, and scalable architectures.",
    type: "website",
    url: "https://aakashyadav.com",
    siteName: "Aakash Yadav Portfolio",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Aakash Yadav — Full-Stack Developer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aakash Yadav — Full-Stack Developer & Engineer",
    description:
      "Full-stack developer specializing in modern web applications, AI-powered solutions, and scalable architectures.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(spaceGrotesk.variable, "h-full")}>
      <body className="antialiased min-h-full flex flex-col font-sans bg-background text-foreground">
        <NoiseTexture />
        <TopBar />
        {/* pt-10 = TopBar (h-10), pb-16 = BottomNav (h-16) */}
        <main className="flex-1 pt-10 pb-16">{children}</main>
        <Footer />
        <BottomNav />
        <CommandMenu />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
