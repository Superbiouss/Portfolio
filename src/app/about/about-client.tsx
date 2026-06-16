"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface AboutClientProps {
  bio: string;
  timeline: { year: string; title: string; desc: string }[];
}

export default function AboutClient({ bio, timeline }: AboutClientProps) {
  return (
    <div className="max-w-[95vw] mx-auto py-16 md:py-32">
      <Button variant="ghost" size="sm" asChild className="mb-12">
        <Link href="/"><ArrowLeft className="mr-2 w-4 h-4" /> HOME</Link>
      </Button>

      {/* Header */}
      <div className="mb-20 md:mb-32">
        <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-muted-foreground block mb-2">ABOUT ME</span>
        <h1 className="text-[clamp(2.5rem,8vw,8rem)] font-bold uppercase tracking-tighter leading-[0.85] mb-8">
          THE <span className="text-accent">DEVELOPER</span><br />BEHIND THE CODE
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl leading-tight">
          {bio || "I'm a full-stack developer passionate about building products that solve real problems. I believe in clean code, thoughtful design, and engineering excellence."}
        </p>
      </div>

      {/* Story + Values grid */}
      <div className="bg-border grid grid-cols-1 md:grid-cols-2 gap-px mb-20 md:mb-32">
        <Card>
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter text-foreground group-hover:text-accent-foreground transition-colors duration-300 mb-6">MY STORY</h2>
          <p className="text-lg text-muted-foreground group-hover:text-accent-foreground/70 transition-colors duration-300">
            {bio || "My journey into software engineering started with a simple curiosity: how do websites work? That question led me down a path of continuous learning and building."}
          </p>
        </Card>
        <Card>
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter text-foreground group-hover:text-accent-foreground transition-colors duration-300 mb-6">VALUES</h2>
          <div className="space-y-6">
            {[
              { title: "CRAFT", desc: "Every detail matters. From typography to microinteractions." },
              { title: "IMPACT", desc: "Building things that solve real problems for real people." },
              { title: "GROWTH", desc: "Constantly learning, experimenting, and pushing boundaries." },
            ].map((v) => (
              <div key={v.title} className="border-b border-border group-hover:border-accent-foreground/20 pb-4 last:border-0 transition-colors duration-300">
                <h3 className="text-lg font-bold uppercase tracking-tighter text-foreground group-hover:text-accent-foreground transition-colors duration-300">{v.title}</h3>
                <p className="text-muted-foreground group-hover:text-accent-foreground/60 transition-colors duration-300">{v.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Timeline — dynamic from experiences */}
      {timeline.length > 0 && (
        <div className="mb-20 md:mb-32">
          <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-muted-foreground block mb-2">JOURNEY</span>
          <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none mb-12">
            <span className="text-accent">DEVELOPER</span> TIMELINE
          </h2>
          <div className="space-y-0">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4, ease: "easeOut" as const }}
                className="border-b-2 border-border py-8 flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 group hover:border-accent transition-colors duration-300"
              >
                <span className="text-[4rem] md:text-[6rem] font-bold leading-none tracking-tighter text-muted group-hover:text-accent transition-colors duration-300">{item.year}</span>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tighter mb-1">{item.title}</h3>
                  <p className="text-lg text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="border-2 border-border p-8 md:p-12">
        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-none mb-4">
          WANT TO <span className="text-accent">WORK TOGETHER?</span>
        </h2>
        <p className="text-lg text-muted-foreground mb-8">I&apos;m always open to interesting projects and collaborations.</p>
        <Button variant="primary" asChild><Link href="/contact">GET IN TOUCH</Link></Button>
      </div>
    </div>
  );
}
