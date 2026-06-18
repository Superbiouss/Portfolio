"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/projects", label: "PROJECTS" },
  { href: "/skills", label: "SKILLS" },
  { href: "/certificates", label: "CERTS" },
  { href: "/resume", label: "RESUME" },
];

export function BottomNav() {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  // Don't render bottom nav on admin pages
  if (isAdminRoute) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t-2 border-border h-16 flex items-stretch">

      {/* LEFT: Wordmark */}
      <div className="flex items-center px-6 border-r-2 border-border shrink-0">
        <Link
          href="/"
          className="text-sm font-extrabold uppercase tracking-tighter text-foreground hover:text-accent transition-colors duration-200"
        >
          PORTFOLIO
        </Link>
      </div>

      {/* CENTER: Nav Links */}
      <nav className="flex-1 flex items-stretch overflow-x-auto scrollbar-none">
        {navLinks.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center px-4 md:px-6 text-xs md:text-sm font-bold uppercase tracking-widest border-r border-border/50 whitespace-nowrap transition-all duration-200 shrink-0",
                isActive
                  ? "bg-accent text-accent-foreground border-r-2 border-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
              )}
            >
              {isActive && (
                <span className="w-1.5 h-1.5 bg-accent-foreground mr-2 shrink-0" aria-hidden="true" />
              )}
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* RIGHT: Actions */}
      <div className="flex items-stretch shrink-0 border-l-2 border-border">
        {/* Cmd+K */}
        <button
          onClick={() => {
            document.dispatchEvent(
              new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true })
            );
          }}
          className="flex items-center gap-1.5 px-4 border-r border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors duration-200"
          aria-label="Open command menu"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="font-mono text-xs hidden sm:block">⌘K</span>
        </button>

        {/* HIRE ME */}
        <Link
          href="/contact"
          className="flex items-center px-5 md:px-8 text-xs md:text-sm font-extrabold uppercase tracking-widest bg-accent text-accent-foreground hover:bg-foreground hover:text-background transition-colors duration-200"
        >
          HIRE ME
        </Link>
      </div>
    </div>
  );
}
