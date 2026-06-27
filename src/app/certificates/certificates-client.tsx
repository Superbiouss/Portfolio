"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface Cert {
  id: string; title: string; issuer: string; date: string; category: string;
  credentialId: string; verifyUrl: string; num: string;
}

interface BadgeItem {
  id: string; title: string; issuer: string; description: string;
  imageUrl: string; badgeUrl: string; date: string;
}

function getPlatformFromIssuer(issuer: string): string {
  const upper = issuer.toUpperCase();
  if (upper.includes("COURSERA")) return "COURSERA";
  if (upper.includes("UDEMY")) return "UDEMY";
  if (upper.includes("N8N")) return "N8N";
  if (upper.includes("ANTHROPIC")) return "ANTHROPIC";
  if (upper.includes("HACK THE BOX") || upper.includes("HTB")) return "HACK THE BOX";
  if (upper.includes("AMAZON") || upper.includes("AWS")) return "AWS";
  return issuer; // Fallback to raw issuer
}

export default function CertificatesClient({ certs, badges }: { certs: Cert[]; badges: BadgeItem[] }) {
  const [activeTab, setActiveTab] = useState<"ALL" | "CERTIFICATES" | "BADGES">("ALL");

  const platformGroups = useMemo(() => {
    const groups: Record<string, { certs: Cert[]; badges: BadgeItem[] }> = {};

    if (activeTab === "ALL" || activeTab === "CERTIFICATES") {
      certs.forEach((c) => {
        const platform = getPlatformFromIssuer(c.issuer);
        if (!groups[platform]) {
          groups[platform] = { certs: [], badges: [] };
        }
        groups[platform].certs.push(c);
      });
    }

    if (activeTab === "ALL" || activeTab === "BADGES") {
      badges.forEach((b) => {
        const platform = getPlatformFromIssuer(b.issuer);
        if (!groups[platform]) {
          groups[platform] = { certs: [], badges: [] };
        }
        groups[platform].badges.push(b);
      });
    }

    return Object.entries(groups)
      .filter(([, data]) => data.certs.length > 0 || data.badges.length > 0)
      .sort(([platA], [platB]) => platA.localeCompare(platB));
  }, [certs, badges, activeTab]);

  return (
    <div className="max-w-[95vw] mx-auto py-16 md:py-32">
      <Button variant="ghost" size="sm" asChild className="mb-12">
        <Link href="/"><ArrowLeft className="mr-2 w-4 h-4" /> HOME</Link>
      </Button>

      <div className="mb-20">
        <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-muted-foreground block mb-2">CREDENTIALS</span>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter leading-none mb-10">
          CERTIFICATES<br />& <span className="text-accent">BADGES</span>
        </h1>

        <div className="flex flex-wrap gap-2">
          {(["ALL", "CERTIFICATES", "BADGES"] as const).map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "primary" : "outline"}
              size="sm"
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-24">
        {platformGroups.map(([platform, data]) => (
          <section key={platform} className="border-t-2 border-border pt-16 first:border-t-0 first:pt-0">
            {/* Platform Title Banner */}
            <div className="mb-12">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none text-foreground flex items-center gap-4">
                <span className="text-accent">✦</span> {platform}
              </h2>
              <div className="mt-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                {data.certs.length > 0 && `${data.certs.length} Certificate${data.certs.length > 1 ? 's' : ''}`}
                {data.certs.length > 0 && data.badges.length > 0 && " • "}
                {data.badges.length > 0 && `${data.badges.length} Badge${data.badges.length > 1 ? 's' : ''}`}
              </div>
            </div>

            {/* Certificates Grid inside this Platform */}
            {data.certs.length > 0 && (
              <div className={data.badges.length > 0 ? "mb-16" : ""}>
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/80 mb-6">CERTIFICATES</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {data.certs.map((cert, i) => (
                    <motion.div
                      key={cert.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.3, ease: "easeOut" }}
                      className="group"
                    >
                      <Card className="h-full flex flex-col relative border-2 border-border bg-background transition-all duration-300 hover:border-accent cursor-pointer min-h-[200px]">
                        <span className="absolute top-4 right-4 text-[6rem] md:text-[8rem] font-bold leading-none text-muted/50 select-none group-hover:text-accent-foreground/10 transition-colors duration-300" aria-hidden="true">{cert.num}</span>
                        <CardContent className="flex-1 relative z-10 pt-6">
                          <div className="flex items-center justify-between mb-4">
                            <Badge variant="outline" className="border-border/50 text-muted-foreground">{cert.category}</Badge>
                            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-hover:text-accent-foreground/60 transition-colors duration-300">{cert.date}</span>
                          </div>
                          <CardTitle className="mb-2">{cert.title}</CardTitle>
                          <p className="text-muted-foreground mb-4">Issued by {cert.issuer}</p>
                        </CardContent>
                        <CardFooter className="relative z-10 mt-auto flex items-center justify-between">
                          {cert.credentialId && <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-hover:text-accent-foreground/40 transition-colors duration-300">ID: {cert.credentialId}</span>}
                          <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-bold uppercase tracking-widest text-muted-foreground group-hover:text-accent-foreground flex items-center gap-2 transition-colors duration-300">
                            VERIFY <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Badges Grid inside this Platform */}
            {data.badges.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/80 mb-6">DIGITAL BADGES</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {data.badges.map((badge, i) => (
                    <motion.div
                      key={badge.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
                      className="group"
                    >
                      <Card className="h-full flex flex-col relative bg-background border-2 border-border rounded-none hover:border-accent transition-colors duration-300">
                        <span className="absolute top-4 right-4 text-[6rem] md:text-[8rem] font-bold leading-none text-muted/50 select-none group-hover:text-accent-foreground/10 transition-colors duration-300" aria-hidden="true">{(i + 1).toString().padStart(2, "0")}</span>
                        
                        <CardContent className="flex-1 relative z-10 pt-6">
                          <div className="relative w-16 h-16 mb-6">
                            {badge.imageUrl ? (
                              <Image
                                src={badge.imageUrl}
                                alt={badge.title}
                                fill
                                className="object-contain transition-all duration-300"
                                sizes="64px"
                              />
                            ) : (
                              <div className="w-full h-full border-2 border-border flex items-center justify-center">
                                <span className="text-xl font-bold text-muted-foreground">🏅</span>
                              </div>
                            )}
                          </div>
                          
                          <Badge variant="outline" className="mb-4 border-border/50 text-muted-foreground">{badge.issuer}</Badge>
                          <CardTitle className="mb-3">{badge.title}</CardTitle>
                          <CardDescription className="mb-6">{badge.description}</CardDescription>
                          
                          {badge.date && (
                            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                              EARNED: {badge.date}
                            </div>
                          )}
                        </CardContent>
                        
                        <CardFooter className="relative z-10 mt-auto">
                          <a href={badge.badgeUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-bold uppercase tracking-widest text-muted-foreground group-hover:text-accent-foreground flex items-center gap-2 transition-colors duration-300">
                            VIEW CREDENTIAL <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
