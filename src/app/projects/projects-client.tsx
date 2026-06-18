"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  tech: string[];
  category: string;
  num: string;
}

export default function ProjectsClient({ projects, categories }: { projects: Project[]; categories: string[] }) {
  const [active, setActive] = useState("ALL");
  const filtered = active === "ALL" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="max-w-[95vw] mx-auto py-16 md:py-32">
      <Button variant="ghost" size="sm" asChild className="mb-12">
        <Link href="/"><ArrowLeft className="mr-2 w-4 h-4" /> HOME</Link>
      </Button>

      <div className="mb-12 md:mb-16">
        <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-muted-foreground block mb-2">PROJECTS</span>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter leading-none">
          ENGINEERING<br /><span className="text-accent">CASE STUDIES</span>
        </h1>
      </div>

      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <Button key={cat} variant={active === cat ? "primary" : "outline"} size="sm" onClick={() => setActive(cat)}>{cat}</Button>
          ))}
        </div>
      )}

      {filtered.length > 0 ? (
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="bg-border grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
        >
          {filtered.map((project) => (
            <motion.div
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
                show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: "easeOut" } },
              }}
              className="group"
            >
              <Card className="h-full flex flex-col relative min-h-[300px] border-none bg-background transition-all duration-500 hover:z-10 hover:shadow-[0_0_40px_rgba(223,225,4,0.1)] hover:scale-[1.02] cursor-pointer">
                <span className="absolute top-4 right-4 text-[8rem] font-bold leading-none text-muted/20 select-none transition-all duration-500 group-hover:text-accent/10 group-hover:-translate-y-4 group-hover:scale-110" aria-hidden="true">{project.num}</span>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <CardContent className="flex-1 relative z-10 pt-8 px-8">
                  <Badge className="mb-6 bg-muted text-muted-foreground group-hover:bg-accent/20 group-hover:text-accent transition-colors">{project.category}</Badge>
                  <CardTitle className="mb-4 text-2xl group-hover:text-accent transition-colors">{project.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed group-hover:text-foreground/80 transition-colors">{project.description}</CardDescription>
                  <div className="flex flex-wrap gap-2 mt-6">
                    {project.tech.map((t) => (<Badge key={t} variant="outline" className="border-border/50 bg-background/50 backdrop-blur-sm group-hover:border-accent/30">{t}</Badge>))}
                  </div>
                </CardContent>
                <CardFooter className="relative z-10 pb-8 px-8 mt-auto">
                  <Link href={`/projects/${project.slug}`} className="text-sm font-bold uppercase tracking-widest text-muted-foreground group-hover:text-accent flex items-center gap-2 transition-colors duration-300">
                    CASE STUDY <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="border-2 border-border p-12 text-center">
          <p className="text-lg text-muted-foreground">No projects found. Add some from the admin panel.</p>
        </div>
      )}
    </div>
  );
}
