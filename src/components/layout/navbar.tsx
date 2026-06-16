"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

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
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-sm border-b-2 border-border">
      <nav className="max-w-[95vw] mx-auto flex items-center justify-between h-14">
        {/* Wordmark */}
        <Link
          href="/"
          className="text-base md:text-lg font-bold uppercase tracking-tighter text-foreground hover:text-accent transition-colors"
        >
          PORTFOLIO
        </Link>

        {/* Centre links — desktop */}
        <div className="hidden md:flex items-center gap-0">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium uppercase tracking-tight text-muted-foreground px-4 py-2 hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right CTA — desktop */}
        <div className="hidden md:flex items-center">
          <Button variant="primary" size="sm" asChild>
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
