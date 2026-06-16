"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface Cert { id: string; title: string; issuer: string; date: string; category: string; credentialId: string; verifyUrl: string; num: string }

export default function CertificatesClient({ certs }: { certs: Cert[] }) {
  return (
    <div className="max-w-[95vw] mx-auto py-16 md:py-32">
      <Button variant="ghost" size="sm" asChild className="mb-12">
        <Link href="/"><ArrowLeft className="mr-2 w-4 h-4" /> HOME</Link>
      </Button>

      <div className="mb-12 md:mb-16">
        <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-muted-foreground block mb-2">CREDENTIALS</span>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter leading-none">
          CERTIFICATES<br />& <span className="text-accent">BADGES</span>
        </h1>
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
          <p className="text-lg text-muted-foreground">No certificates added yet. Add some from the admin panel.</p>
        </div>
      )}
    </div>
  );
}
