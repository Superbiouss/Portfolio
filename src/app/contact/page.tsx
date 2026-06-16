"use client";

import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import Link from "next/link";
import { ArrowLeft, Mail, Code2, Briefcase } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-[95vw] mx-auto py-16 md:py-32">
      <Button variant="ghost" size="sm" asChild className="mb-12">
        <Link href="/"><ArrowLeft className="mr-2 w-4 h-4" /> HOME</Link>
      </Button>

      <div className="mb-16 md:mb-24">
        <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-muted-foreground block mb-2">CONTACT</span>
        <h1 className="text-[clamp(2.5rem,8vw,8rem)] font-bold uppercase tracking-tighter leading-[0.85]">
          GET IN<br /><span className="text-accent">TOUCH</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-border">
        {/* Form — 2 columns wide */}
        <div className="lg:col-span-2 bg-background p-8 md:p-12">
          {submitted ? (
            <div className="text-center py-20">
              <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-4">
                <span className="text-accent">THANK YOU</span>
              </h3>
              <p className="text-lg text-muted-foreground">Your message has been sent. I&apos;ll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-4">NAME</label>
                  <Input placeholder="YOUR NAME" required />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-4">EMAIL</label>
                  <Input type="email" placeholder="YOU@EXAMPLE.COM" required />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-4">SUBJECT</label>
                <Input placeholder="WHAT'S THIS ABOUT?" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-4">MESSAGE</label>
                <Textarea placeholder="Tell me about your project..." required />
              </div>
              <Button variant="primary" type="submit" size="lg">
                <Mail className="mr-3 w-5 h-5" /> SEND MESSAGE
              </Button>
            </form>
          )}
        </div>

        {/* Sidebar — social links */}
        <div className="bg-background p-8 md:p-12 flex flex-col gap-0">
          {[
            { icon: Mail, label: "EMAIL", value: "hello@example.com", href: "mailto:hello@example.com" },
            { icon: Code2, label: "GITHUB", value: "github.com", href: "https://github.com" },
            { icon: Briefcase, label: "LINKEDIN", value: "linkedin.com", href: "https://linkedin.com" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="border-b-2 border-border py-6 last:border-0 group flex items-center gap-4 hover:border-accent transition-colors duration-300"
            >
              <div className="w-10 h-10 border-2 border-border group-hover:border-accent group-hover:bg-accent flex items-center justify-center transition-all duration-300">
                <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-accent-foreground transition-colors duration-300" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground block">{item.label}</span>
                <span className="text-sm font-bold uppercase tracking-tight text-accent group-hover:text-foreground transition-colors duration-300">{item.value}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
