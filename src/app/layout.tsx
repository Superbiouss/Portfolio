import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { NoiseTexture } from "@/components/ui/noise-texture";
import { CommandMenu } from "@/components/ui/command-menu";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PORTFOLIO — DEVELOPER & ENGINEER",
  description:
    "A production-grade developer portfolio showcasing projects, skills, certifications, and engineering case studies.",
  openGraph: {
    title: "PORTFOLIO — DEVELOPER & ENGINEER",
    description:
      "A production-grade developer portfolio showcasing projects, skills, certifications, and engineering case studies.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PORTFOLIO — DEVELOPER & ENGINEER",
    description:
      "A production-grade developer portfolio showcasing projects, skills, certifications, and engineering case studies.",
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
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CommandMenu />
      </body>
    </html>
  );
}
