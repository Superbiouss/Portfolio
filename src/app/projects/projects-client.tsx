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
        <div className="bg-border grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px">
          {filtered.map((project, i) => (
            <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05, duration: 0.3, ease: "easeOut" as const }}>
              <Card className="h-full flex flex-col relative min-h-[280px]">
                <span className="absolute top-4 right-4 text-[8rem] font-bold leading-none text-muted/30 select-none group-hover:text-accent-foreground/10 transition-colors duration-300" aria-hidden="true">{project.num}</span>
                <CardContent className="flex-1 relative z-10">
                  <Badge className="mb-4">{project.category}</Badge>
                  <CardTitle className="mb-3">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                  <div className="flex flex-wrap gap-2 mt-4">{project.tech.map((t) => (<Badge key={t} variant="muted">{t}</Badge>))}</div>
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
          <p className="text-lg text-muted-foreground">No projects found. Add some from the admin panel.</p>
        </div>
      )}
    </div>
  );
}
