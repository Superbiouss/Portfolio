"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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

          <div className="bg-border grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-px">
            {badges.map((badge, i) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.3, ease: "easeOut" as const }}
              >
                <a
                  href={badge.badgeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-background p-4 md:p-6 text-center hover:bg-accent transition-colors duration-300 h-full"
                >
                  {/* Badge Image */}
                  <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 flex items-center justify-center">
                    {badge.imageUrl ? (
                      <img
                        src={badge.imageUrl}
                        alt={badge.title}
                        className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(223,225,4,0.3)] group-hover:drop-shadow-none transition-all duration-300"
                      />
                    ) : (
                      <div className="w-full h-full border-2 border-border group-hover:border-accent-foreground flex items-center justify-center transition-colors duration-300">
                        <span className="text-2xl font-bold text-muted-foreground group-hover:text-accent-foreground transition-colors duration-300">🏅</span>
                      </div>
                    )}
                  </div>

                  {/* Badge Info */}
                  <h3 className="text-sm md:text-base font-bold uppercase tracking-tighter text-foreground group-hover:text-accent-foreground transition-colors duration-300 mb-1">
                    {badge.title}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-hover:text-accent-foreground/60 transition-colors duration-300">
                    {badge.issuer}
                  </p>
                  {badge.date && (
                    <p className="text-xs text-muted-foreground group-hover:text-accent-foreground/40 mt-1 transition-colors duration-300">
                      {badge.date}
                    </p>
                  )}
                </a>
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
          <div className="bg-border grid grid-cols-1 md:grid-cols-2 gap-px">
            {certs.map((cert, i) => (
              <motion.div key={cert.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.3, ease: "easeOut" as const }}>
                <Card className="relative min-h-[200px]">
                  <span className="absolute top-4 right-4 text-[6rem] md:text-[8rem] font-bold leading-none text-muted/30 select-none group-hover:text-accent-foreground/10 transition-colors duration-300" aria-hidden="true">{cert.num}</span>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="accent">{cert.category}</Badge>
                      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-hover:text-accent-foreground/60 transition-colors duration-300">{cert.date}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tighter text-foreground group-hover:text-accent-foreground mb-2 transition-colors duration-300">{cert.title}</h3>
                    <p className="text-muted-foreground group-hover:text-accent-foreground/60 mb-4 transition-colors duration-300">Issued by {cert.issuer}</p>
                    <div className="flex items-center justify-between">
                      {cert.credentialId && <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-hover:text-accent-foreground/40 transition-colors duration-300">ID: {cert.credentialId}</span>}
                      <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" className="text-accent group-hover:text-accent-foreground text-xs font-bold uppercase tracking-widest flex items-center gap-1 transition-colors duration-300">
                        VERIFY <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
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
