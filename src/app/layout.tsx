import type { Metadata } from "next";
import { getSiteSettings } from "@/app/actions/settings";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TopBar } from "@/components/layout/top-bar";
import { BottomNav } from "@/components/layout/bottom-nav";
import { ConditionalFooter } from "@/components/layout/conditional-footer";
import { NoiseTexture } from "@/components/ui/noise-texture";
import { CommandMenu } from "@/components/ui/command-menu";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  const ogImages = settings.default_og_image
    ? [{ url: settings.default_og_image, width: 1200, height: 630, alt: settings.site_title }]
    : [{ url: "/og-image.png", width: 1200, height: 630, alt: settings.site_title }];

  return {
    title: {
      default: settings.site_title,
      template: `%s | ${settings.site_title.split("—")[0].trim()}`,
    },
    description: settings.site_description,
    keywords: settings.seo_keywords,
    metadataBase: new URL("https://aakashyadav.com"),
    openGraph: {
      title: settings.site_title,
      description: settings.site_description,
      type: "website",
      url: "https://aakashyadav.com",
      siteName: settings.site_title.split("—")[0].trim(),
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: settings.site_title,
      description: settings.site_description,
      images: [ogImages[0].url],
    },
  };
}

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
        <ConditionalFooter />
        <BottomNav />
        <CommandMenu />
        <Analytics />
        <SpeedInsights />
        <Toaster 
          toastOptions={{
            className: "bg-background border-2 border-border text-foreground font-bold uppercase tracking-tighter shadow-none rounded-none",
            descriptionClassName: "text-muted-foreground font-medium normal-case tracking-normal text-xs",
            classNames: {
              actionButton: "bg-accent text-background font-bold uppercase border-none rounded-none hover:bg-accent/90",
              cancelButton: "bg-muted text-muted-foreground font-bold uppercase border-none rounded-none hover:bg-muted/80",
            }
          }}
        />
      </body>
    </html>
  );
}
