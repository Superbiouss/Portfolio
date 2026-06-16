"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Marquee from "react-fast-marquee";
import { ArrowRight, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface HomeClientProps {
  stats: { value: string; label: string }[];
  featuredProjects: { title: string; description: string; tech: string[]; slug: string; num: string }[];
  heroTagline: string;
  bio: string;
}

export default function HomeClient({ stats, featuredProjects, heroTagline, bio }: HomeClientProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative overflow-hidden py-20 md:py-32">
        <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="max-w-[95vw] mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            className="text-[clamp(3rem,12vw,14rem)] font-bold uppercase leading-[0.85] tracking-tighter"
          >
            CRAFTING<br /><span className="text-accent">DIGITAL</span><br />EXPERIENCES
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" as const }}
            className="mt-8 md:mt-12 max-w-2xl"
          >
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground leading-tight">
              {bio || "Full-stack developer specializing in modern web applications, AI-powered solutions, and scalable architectures."}
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Button variant="primary" size="lg" asChild>
                <Link href="/projects">VIEW PROJECTS <ArrowRight className="ml-3 w-5 h-5" /></Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/resume"><Download className="mr-3 w-5 h-5" /> RESUME</Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* STATS MARQUEE */}
      <section className="bg-accent text-accent-foreground border-y-2 border-accent-foreground/20 overflow-hidden">
        <Marquee speed={80} gradient={false} autoFill>
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-4 px-8 md:px-12 py-6">
              <span className="text-[6rem] md:text-[8rem] font-bold leading-none tracking-tighter">{stat.value}</span>
              <span className="text-xs md:text-sm font-bold uppercase tracking-widest opacity-60">{stat.label}</span>
              <span className="text-[6rem] md:text-[8rem] font-bold leading-none tracking-tighter opacity-20 mx-4" aria-hidden="true">✦</span>
            </div>
          ))}
        </Marquee>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="py-20 md:py-32">
        <div className="max-w-[95vw] mx-auto">
          <div className="flex items-end justify-between mb-12 md:mb-16">
            <div>
              <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-muted-foreground block mb-2">FEATURED WORK</span>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter leading-none">
                SELECTED<br /><span className="text-accent">PROJECTS</span>
              </h2>
            </div>
            <Button variant="outline" asChild className="hidden md:inline-flex">
              <Link href="/projects">VIEW ALL <ArrowRight className="ml-3 w-4 h-4" /></Link>
            </Button>
          </div>

          {featuredProjects.length > 0 ? (
            <div className="bg-border grid grid-cols-1 md:grid-cols-3 gap-px">
              {featuredProjects.map((project, i) => (
                <motion.div key={project.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.4, ease: "easeOut" as const }}>
                  <Card className="h-full flex flex-col relative">
                    <span className="absolute top-4 right-4 text-[8rem] md:text-[10rem] font-bold leading-none text-muted/50 select-none group-hover:text-accent-foreground/10 transition-colors duration-300" aria-hidden="true">{project.num}</span>
                    <CardContent className="flex-1 relative z-10">
                      <div className="flex flex-wrap gap-2 mb-4">{project.tech.map((t) => (<Badge key={t}>{t}</Badge>))}</div>
                      <CardTitle className="mb-3">{project.title}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardContent>
                    <CardFooter className="relative z-10">
                      <Link href={`/projects/${project.slug}`} className="text-sm font-bold uppercase tracking-widest text-muted-foreground group-hover:text-accent-foreground flex items-center gap-2 transition-colors duration-300">
                        CASE STUDY <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="border-2 border-border p-12 text-center">
              <p className="text-lg text-muted-foreground">No featured projects yet. Add projects from the admin panel.</p>
            </div>
          )}

          <div className="md:hidden mt-8">
            <Button variant="outline" className="w-full" asChild><Link href="/projects">VIEW ALL PROJECTS</Link></Button>
          </div>
        </div>
      </section>

      {/* SKILLS PREVIEW */}
      <section className="py-20 md:py-32 border-t-2 border-border">
        <div className="max-w-[95vw] mx-auto">
          <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-muted-foreground block mb-2">CAPABILITIES</span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter leading-none mb-12 md:mb-16">SKILLS &<br /><span className="text-accent">TECHNOLOGIES</span></h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" asChild><Link href="/skills">VIEW ALL SKILLS <ArrowRight className="ml-3 w-4 h-4" /></Link></Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 border-t-2 border-border">
        <div className="max-w-[95vw] mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: "easeOut" as const }}>
            <h2 className="text-[clamp(2.5rem,8vw,8rem)] font-bold uppercase tracking-tighter leading-[0.85] mb-8">
              LET&apos;S BUILD<br /><span className="text-accent">SOMETHING</span><br />TOGETHER
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mb-8 leading-tight">
              Looking for a developer who cares about craft? I&apos;m available for freelance projects, collaborations, and full-time opportunities.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg" asChild><Link href="/contact">GET IN TOUCH</Link></Button>
              <Button variant="outline" size="lg" asChild><Link href="/projects">VIEW MY WORK <ArrowRight className="ml-3 w-5 h-5" /></Link></Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
