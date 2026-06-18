"use client";

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

export default function CertificatesClient({ certs, badges }: { certs: Cert[]; badges: BadgeItem[] }) {
  return (
    <div className="max-w-[95vw] mx-auto py-16 md:py-32">
      <Button variant="ghost" size="sm" asChild className="mb-12">
        <Link href="/"><ArrowLeft className="mr-2 w-4 h-4" /> HOME</Link>
      </Button>

      <div className="mb-16 md:mb-24">
        <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-muted-foreground block mb-2">CREDENTIALS</span>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter leading-none">
          CERTIFICATES<br />& <span className="text-accent">BADGES</span>
        </h1>
      </div>

      {/* ═══ BADGES SECTION ═══ */}
      {badges.length > 0 && (
        <section className="mb-20 md:mb-32">
          <div className="flex items-baseline gap-4 mb-8">
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-none">BADGES</h2>
            <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{badges.length} EARNED</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {badges.map((badge, i) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4, ease: "easeOut" as const }}
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
        </section>
      )}

      {/* ═══ CERTIFICATES SECTION ═══ */}
      <section>
        <div className="flex items-baseline gap-4 mb-8">
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-none">CERTIFICATES</h2>
          <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{certs.length} EARNED</span>
        </div>

        {certs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {certs.map((cert, i) => (
              <motion.div key={cert.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.3, ease: "easeOut" as const }} className="group">
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
        ) : (
          <div className="border-2 border-border p-12 text-center">
            <p className="text-lg text-muted-foreground">No certificates added yet.</p>
          </div>
        )}
      </section>
    </div>
  );
}
