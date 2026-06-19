"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Marquee from "react-fast-marquee";
import { ArrowRight, Download, ExternalLink, Code2, Database, LayoutTemplate, Code, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface HomeClientProps {
  stats: { value: string; label: string }[];
  featuredProjects: { title: string; description: string; tech: string[]; slug: string; num: string }[];
  bio: string;
  skills: any[];
  experiences: any[];
  certificates: any[];
}

export default function HomeClient({ stats, featuredProjects, bio, skills, experiences, certificates }: HomeClientProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Generate random data for the mock github contribution graph
  const githubSquares = Array.from({ length: 119 }, () => (Math.random() > 0.65 ? Math.floor(Math.random() * 4) + 1 : 0));

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative overflow-hidden min-h-[calc(90vh-104px)] flex flex-col justify-center pt-16 pb-24 md:pt-24 md:pb-32">
        <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="max-w-[95vw] mx-auto w-full relative z-10 text-center flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3rem,10vw,11rem)] font-extrabold uppercase leading-[0.85] tracking-tight"
          >
            <span className="block text-foreground/90 hover:text-foreground transition-colors duration-500">CRAFTING</span>
            <span className="block text-accent relative inline-block group">
              DIGITAL
            </span>
            <span className="block text-foreground">EXPERIENCES</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 md:mt-16 max-w-3xl mx-auto flex flex-col items-center"
          >
            <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground leading-relaxed font-light">
              {bio || "Full-stack developer specializing in modern web applications, AI-powered solutions, and scalable architectures."}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <Button variant="primary" size="lg" asChild>
                <Link href="/projects" className="group flex items-center">
                  VIEW PROJECTS
                  <ArrowRight className="ml-3 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/resume" className="group flex items-center">
                  <Download className="mr-3 w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1" />
                  RESUME
                </Link>
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

      {/* ABOUT ME SPLIT */}
      <section className="py-20 md:py-32 border-b-2 border-border overflow-hidden">
        <div className="max-w-[95vw] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
             <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter leading-none mb-8">
                THE<br /><span className="text-accent">DEVELOPER</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                I am passionate about building products that are robust under the hood and beautiful on the surface. My approach bridges the gap between complex engineering problems and seamless user experiences.
              </p>
              <Button variant="outline" asChild><Link href="/about">READ FULL BIO <ArrowRight className="ml-3 w-4 h-4" /></Link></Button>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative aspect-square md:aspect-auto md:h-[600px] border-2 border-border bg-muted overflow-hidden flex items-center justify-center group">
             {/* Placeholder for an actual avatar/image */}
             <div className="absolute inset-0 bg-accent/10 group-hover:bg-accent/0 transition-colors duration-500 z-10" />
             <div className="w-[80%] h-[80%] border-2 border-foreground/10 absolute rotate-3 group-hover:rotate-0 transition-transform duration-500" />
             <span className="text-muted-foreground/30 font-bold text-4xl uppercase tracking-widest">AVATAR.JPG</span>
          </motion.div>
        </div>
      </section>

      {/* WHAT I DO (SERVICES) */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="max-w-[95vw] mx-auto">
          <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-muted-foreground block mb-2">SERVICES</span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter leading-none mb-12 md:mb-16">
            CORE<br /><span className="text-accent">COMPETENCIES</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: LayoutTemplate, title: "FRONTEND ENGINEERING", desc: "Building highly interactive, accessible, and performant user interfaces using modern frameworks like React and Next.js." },
              { icon: Database, title: "BACKEND ARCHITECTURE", desc: "Designing robust APIs, scalable database schemas, and secure server-side logic using Node.js, Python, and SQL." },
              { icon: Code2, title: "UI/UX DESIGN", desc: "Crafting premium brutalist designs with a focus on micro-interactions, responsive layouts, and kinetic typography." }
            ].map((service, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                <Card className="h-full bg-background transition-colors border-2 border-border rounded-none hover:border-accent group">
                  <CardContent className="p-8">
                    <service.icon className="w-12 h-12 text-accent mb-6 transition-transform duration-300" />
                    <h3 className="text-2xl font-bold uppercase tracking-tight mb-4">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="py-20 md:py-32 border-t-2 border-border">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {featuredProjects.map((project, i) => (
                <motion.div key={project.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.4, ease: "easeOut" as const }}>
                  <Card className="h-full flex flex-col relative border-2 border-border rounded-none hover:border-accent transition-colors duration-300">
                    <span className="absolute top-4 right-4 text-[8rem] md:text-[10rem] font-bold leading-none text-muted/50 select-none group-hover:text-accent-foreground/10 transition-colors duration-300" aria-hidden="true">{project.num}</span>
                    <CardContent className="flex-1 relative z-10">
                      <CardTitle className="mb-3">{project.title}</CardTitle>
                      <CardDescription className="mb-6">{project.description}</CardDescription>
                      <div className="flex flex-wrap gap-2">{project.tech.map((t) => (<Badge key={t} variant="outline" className="border-border bg-background text-muted-foreground rounded-none">{t}</Badge>))}</div>
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
              <p className="text-lg text-muted-foreground">No featured projects yet.</p>
            </div>
          )}

          <div className="md:hidden mt-8">
            <Button variant="outline" className="w-full" asChild><Link href="/projects">VIEW ALL PROJECTS</Link></Button>
          </div>
        </div>
      </section>

      {/* PROFESSIONAL JOURNEY TIMELINE */}
      {experiences && experiences.length > 0 && (
        <section className="py-20 md:py-32 border-t-2 border-border bg-muted/10">
          <div className="max-w-[95vw] md:max-w-4xl mx-auto">
            <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-muted-foreground block mb-2 text-center">JOURNEY</span>
            <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none mb-16 text-center">
              EXPERIENCE
            </h2>
            <div className="relative border-l-2 border-border ml-4 md:ml-0 md:pl-0">
              {experiences.map((exp, i) => (
                <motion.div key={exp.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="mb-12 relative pl-8 md:pl-12">
                  <div className="absolute w-4 h-4 bg-accent rounded-none -left-[9px] top-2 border-2 border-background" />
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                     <h3 className="text-2xl font-bold uppercase">{exp.title}</h3>
                     <span className="text-accent font-mono text-sm tracking-widest mt-1 md:mt-0">
                       {exp.start_date ? new Date(exp.start_date).getFullYear() : 'PAST'} — {exp.is_current ? 'PRESENT' : (exp.end_date ? new Date(exp.end_date).getFullYear() : '')}
                     </span>
                  </div>
                  <h4 className="text-lg text-muted-foreground uppercase tracking-wider mb-4">{exp.organization}</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button variant="outline" asChild><Link href="/resume">VIEW FULL RESUME</Link></Button>
            </div>
          </div>
        </section>
      )}

      {/* FEATURED CERTIFICATES */}
      {certificates && certificates.length > 0 && (
         <section className="py-20 md:py-32 border-t-2 border-border">
          <div className="max-w-[95vw] mx-auto">
            <div className="flex items-end justify-between mb-12">
               <div>
                <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-muted-foreground block mb-2">ACHIEVEMENTS</span>
                <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none">CERTIFICATES</h2>
               </div>
               <Button variant="outline" asChild className="hidden md:inline-flex">
                 <Link href="/certificates">VIEW ALL <ArrowRight className="ml-3 w-4 h-4" /></Link>
               </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {certificates.map((cert, i) => (
                 <motion.div key={cert.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                    <Card className="h-full bg-background border-2 border-border rounded-none hover:border-accent transition-colors group relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity"><Award className="w-24 h-24 text-accent" /></div>
                       <CardContent className="p-8 relative z-10">
                         <span className="text-xs font-bold text-muted-foreground tracking-widest uppercase mb-2 block">{cert.issuer}</span>
                         <h3 className="text-xl font-bold uppercase mb-4">{cert.title}</h3>
                         {cert.verification_url && (
                           <Link href={cert.verification_url} target="_blank" className="text-sm font-bold text-accent flex items-center hover:underline">
                             VERIFY <ExternalLink className="ml-2 w-3 h-3" />
                           </Link>
                         )}
                       </CardContent>
                    </Card>
                 </motion.div>
               ))}
            </div>
            <div className="md:hidden mt-8">
              <Button variant="outline" className="w-full" asChild><Link href="/certificates">VIEW ALL CERTIFICATES</Link></Button>
            </div>
          </div>
         </section>
      )}

      {/* SKILLS MARQUEE PREVIEW */}
      <section className="py-20 md:py-32 border-t-2 border-border bg-foreground text-background">
        <div className="max-w-[95vw] mx-auto mb-12 text-center">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter leading-none text-background">
            TECHNOLOGY<br /><span className="text-accent">STACK</span>
          </h2>
        </div>
        {skills && skills.length > 0 ? (
           <Marquee speed={50} gradient={false} autoFill className="py-8 border-y-2 border-background/20">
             {skills.map((skill) => (
               <div key={skill.id} className="mx-8 flex items-center gap-4">
                 <span className="text-4xl md:text-5xl font-bold uppercase tracking-tight">{skill.name}</span>
                 <span className="text-accent text-2xl mx-4">✦</span>
               </div>
             ))}
           </Marquee>
        ) : (
          <div className="text-center py-8"><p>No skills found.</p></div>
        )}
        <div className="text-center mt-12">
          <Button variant="outline" className="border-background text-background hover:bg-background hover:text-foreground" asChild>
            <Link href="/skills">VIEW ALL SKILLS <ArrowRight className="ml-3 w-4 h-4" /></Link>
          </Button>
        </div>
      </section>

      {/* GITHUB STATS MOCK */}
      <section className="py-20 md:py-32 border-t-2 border-border overflow-hidden relative">
        <div className="max-w-[95vw] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
             <div>
                <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-muted-foreground block mb-2">OPEN SOURCE</span>
                <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none mb-6">
                  CONSISTENT<br /><span className="text-accent">DELIVERY</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-md">
                  I believe in learning in public and maintaining a steady rhythm of shipping code. Here&apos;s a snapshot of my recent coding activity.
                </p>
                <Button variant="outline" asChild>
                  <Link href="https://github.com/Superbiouss" target="_blank" className="flex items-center">
                     <Code className="w-5 h-5 mr-3" /> GITHUB PROFILE
                  </Link>
                </Button>
             </div>
             
             {/* Mock GitHub Grid */}
             <motion.div initial={{ opacity: 0, rotateX: 20 }} whileInView={{ opacity: 1, rotateX: 0 }} viewport={{ once: true }} className="border-2 border-border p-6 bg-muted/20 rotate-[-1deg] hover:rotate-0 transition-transform duration-500">
               <div className="flex gap-1 flex-wrap w-[100%] max-w-[500px]">
                  {githubSquares.map((val, i) => (
                    <div 
                      key={i}
                      className={`w-3 h-3 md:w-4 md:h-4 border border-border transition-colors duration-500 ${
                        val === 0 ? 'bg-background' :
                        val === 1 ? 'bg-accent/30' :
                        val === 2 ? 'bg-accent/60' :
                        val === 3 ? 'bg-accent/80' :
                        'bg-accent'
                      } hover:bg-foreground relative`}
                    />
                  ))}
               </div>
               <div className="flex items-center justify-between mt-6 text-xs text-muted-foreground font-mono uppercase tracking-widest">
                  <span>Less</span>
                  <div className="flex gap-1">
                     <div className="w-3 h-3 bg-background border border-border" />
                     <div className="w-3 h-3 bg-accent/30 border border-border" />
                     <div className="w-3 h-3 bg-accent/60 border border-border" />
                     <div className="w-3 h-3 bg-accent/80 border border-border" />
                     <div className="w-3 h-3 bg-accent border border-border" />
                  </div>
                  <span>More</span>
               </div>
             </motion.div>
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
