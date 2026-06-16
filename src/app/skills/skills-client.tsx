"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface SkillGroup { category: string; num: string; skills: string[] }

export default function SkillsClient({ skillGroups }: { skillGroups: SkillGroup[] }) {
  return (
    <div className="max-w-[95vw] mx-auto py-16 md:py-32">
      <Button variant="ghost" size="sm" asChild className="mb-12">
        <Link href="/"><ArrowLeft className="mr-2 w-4 h-4" /> HOME</Link>
      </Button>

      <div className="mb-12 md:mb-16">
        <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-muted-foreground block mb-2">SKILLS</span>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter leading-none">
          SKILLS &<br /><span className="text-accent">TECHNOLOGIES</span>
        </h1>
      </div>

      {skillGroups.length > 0 ? (
        <div className="bg-border grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px">
          {skillGroups.map((group, i) => (
            <motion.div key={group.category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.3, ease: "easeOut" as const }}>
              <Card className="relative overflow-hidden min-h-[250px]">
                <span className="absolute -top-4 -right-2 text-[8rem] font-bold leading-none text-muted/30 select-none group-hover:text-accent-foreground/10 transition-colors duration-300" aria-hidden="true">{group.num}</span>
                <div className="relative z-10">
                  <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tighter text-foreground group-hover:text-accent-foreground mb-6 transition-colors duration-300">{group.category}</h3>
                  <div className="flex flex-wrap gap-2">{group.skills.map((skill) => (<Badge key={skill}>{skill}</Badge>))}</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="border-2 border-border p-12 text-center">
          <p className="text-lg text-muted-foreground">No skills added yet. Add some from the admin panel.</p>
        </div>
      )}
    </div>
  );
}
