import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Briefcase, Code2, Award, User, LogOut, Clock, MessageSquare, Shield, Image, Search, ExternalLink, LayoutTemplate } from "lucide-react";

const sidebarLinks = [
  { href: "/admin", label: "DASHBOARD", icon: LayoutDashboard },
  { href: "/admin/services", label: "SERVICES", icon: LayoutTemplate },
  { href: "/admin/projects", label: "PROJECTS", icon: Briefcase },
  { href: "/admin/skills", label: "SKILLS", icon: Code2 },
  { href: "/admin/certificates", label: "CERTIFICATES", icon: Award },
  { href: "/admin/badges", label: "BADGES", icon: Shield },
  { href: "/admin/experiences", label: "EXPERIENCES", icon: Clock },
  { href: "/admin/messages", label: "MESSAGES", icon: MessageSquare },
  { href: "/admin/media", label: "MEDIA", icon: Image },
  { href: "/admin/seo", label: "SEO", icon: Search },
  { href: "/admin/profile", label: "PROFILE", icon: User },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const isSupabaseConfigured = !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL && 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-60 bg-background border-r-2 border-border flex flex-col">
        <div className="p-4 border-b-2 border-border flex items-center justify-between">
          <Link href="/admin" className="text-base font-bold uppercase tracking-tighter text-foreground">ADMIN</Link>
          <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 border ${
            isSupabaseConfigured 
              ? "border-emerald-500 bg-emerald-500/10 text-emerald-500" 
              : "border-red-500 bg-red-500/10 text-red-500"
          }`}>
            {isSupabaseConfigured ? "ONLINE" : "OFFLINE"}
          </span>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold uppercase tracking-tight text-muted-foreground hover:text-accent hover:bg-muted transition-colors"
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t-2 border-border">
          <Button variant="ghost" asChild className="w-full justify-start gap-3 text-muted-foreground hover:text-accent mb-2">
            <Link href="/" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" /> VIEW SITE
            </Link>
          </Button>
          <form action={async () => { "use server"; const { logout } = await import("@/app/actions/auth"); await logout(); }}>
            <Button variant="ghost" type="submit" className="w-full justify-start gap-3 text-muted-foreground hover:text-red-500">
              <LogOut className="w-4 h-4" /> LOGOUT
            </Button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-muted/30 p-8">{children}</main>
    </div>
  );
}
