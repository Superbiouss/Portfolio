"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Search } from "lucide-react";

const navLinks = [
  { href: "/about", label: "ABOUT" },
  { href: "/projects", label: "PROJECTS" },
  { href: "/skills", label: "SKILLS" },
  { href: "/certificates", label: "CERTIFICATES" },
  { href: "/resume", label: "RESUME" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/60 backdrop-blur-xl border-b border-border/50 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
      <nav className="max-w-[95vw] mx-auto flex items-center justify-between h-16">
        {/* Wordmark */}
        <Link
          href="/"
          className="text-base md:text-lg font-bold uppercase tracking-tighter text-foreground hover:text-accent transition-colors relative group"
        >
          PORTFOLIO
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
        </Link>

        {/* Centre links — desktop */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium uppercase tracking-tight text-muted-foreground px-4 py-2 hover:text-foreground hover:bg-muted/30 rounded-full transition-all"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right CTA & Cmd+K — desktop */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => {
              const event = new KeyboardEvent("keydown", {
                key: "k",
                metaKey: true,
                bubbles: true,
              });
              document.dispatchEvent(event);
            }}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground bg-muted/30 hover:bg-muted/50 hover:text-foreground rounded-full border border-border/50 transition-colors"
          >
            <Search className="w-4 h-4" />
            <span className="font-mono text-xs">⌘K</span>
          </button>
          <Button variant="primary" size="sm" className="rounded-full px-6 hover:scale-105 transition-transform shadow-[0_0_10px_rgba(223,225,4,0.1)] hover:shadow-[0_0_15px_rgba(223,225,4,0.3)]" asChild>
            <Link href="/contact">HIRE ME</Link>
          </Button>
        </div>

        {/* Hamburger — mobile */}
        <button
          className="md:hidden p-2 text-foreground hover:text-accent transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-b-2 border-border px-6 pb-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-lg font-bold uppercase tracking-tighter text-muted-foreground py-3 border-b border-border hover:text-accent transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4">
            <Button variant="primary" className="w-full" asChild>
              <Link href="/contact">HIRE ME</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
