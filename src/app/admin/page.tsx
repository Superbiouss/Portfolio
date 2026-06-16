import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Briefcase, Code2, Award, Shield, Clock } from "lucide-react";

export default async function AdminDashboard() {
  let projectCount = 6; // Fallback counts
  let skillCount = 18;
  let certCount = 4;
  let badgeCount = 4;
  let expCount = 4;

  try {
    const supabase = await createClient();
    
    // Attempt to fetch real counts
    const [{ count: pCount }, { count: sCount }, { count: cCount }, { count: bCount }, { count: eCount }] = await Promise.all([
      supabase.from("projects").select("*", { count: "exact", head: true }),
      supabase.from("skills").select("*", { count: "exact", head: true }),
      supabase.from("certificates").select("*", { count: "exact", head: true }),
      supabase.from("badges").select("*", { count: "exact", head: true }),
      supabase.from("experiences").select("*", { count: "exact", head: true }),
    ]);

    if (pCount !== null) projectCount = pCount;
    if (sCount !== null) skillCount = sCount;
    if (cCount !== null) certCount = cCount;
    if (bCount !== null) badgeCount = bCount;
    if (eCount !== null) expCount = eCount;
  } catch {
    // Supabase not fully configured yet, use fallbacks
  }

  const stats = [
    { label: "PROJECTS", value: projectCount.toString(), icon: Briefcase, href: "/admin/projects" },
    { label: "SKILLS", value: skillCount.toString(), icon: Code2, href: "/admin/skills" },
    { label: "CERTIFICATES", value: certCount.toString(), icon: Award, href: "/admin/certificates" },
    { label: "BADGES", value: badgeCount.toString(), icon: Shield, href: "/admin/badges" },
    { label: "EXPERIENCES", value: expCount.toString(), icon: Clock, href: "/admin/experiences" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter">DASHBOARD</h1>
          <p className="text-sm text-muted-foreground uppercase tracking-widest mt-1">MANAGE YOUR PORTFOLIO CONTENT</p>
        </div>
        <Button variant="primary" asChild>
          <Link href="/admin/projects/new"><Plus className="mr-2 w-4 h-4" /> NEW PROJECT</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-border mb-12">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <div className="bg-background border-2 border-border p-6 md:p-8 hover:border-accent hover:bg-accent group transition-colors duration-300 h-full">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-hover:text-accent-foreground transition-colors duration-300">{stat.label}</span>
                <stat.icon className="w-4 h-4 text-muted-foreground group-hover:text-accent-foreground transition-colors duration-300" />
              </div>
              <div className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground group-hover:text-accent-foreground transition-colors duration-300">{stat.value}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="border-2 border-border p-6 md:p-8">
        <h2 className="text-xl font-bold uppercase tracking-tighter mb-4">QUICK ACTIONS</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" asChild><Link href="/admin/projects/new">ADD PROJECT</Link></Button>
          <Button variant="outline" asChild><Link href="/admin/skills/new">ADD SKILL</Link></Button>
          <Button variant="outline" asChild><Link href="/admin/certificates/new">ADD CERTIFICATE</Link></Button>
          <Button variant="outline" asChild><Link href="/admin/badges/new">ADD BADGE</Link></Button>
          <Button variant="outline" asChild><Link href="/admin/profile">EDIT PROFILE</Link></Button>
        </div>
      </div>
    </div>
  );
}
