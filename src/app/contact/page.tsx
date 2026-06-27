import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import ContactForm from "./contact-form";
import { ArrowLeft, Mail, Code2, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Aakash Yadav — available for freelance projects, collaborations, and full-time opportunities.",
};

export default async function ContactPage() {
  // Fetch contact links dynamically from profile
  let email = "hello@aakashyadav.com";
  let githubUrl = "https://github.com/Superbiouss";
  let linkedinUrl = "https://www.linkedin.com/in/mr-yadav-aakash/";

  try {
    const supabase = await createClient();
    const { data: profile } = await supabase.from("profiles").select("email, github_url, linkedin_url").limit(1).single();
    if (profile?.email) email = profile.email;
    if (profile?.github_url) githubUrl = profile.github_url;
    if (profile?.linkedin_url) linkedinUrl = profile.linkedin_url;
  } catch {
    // Supabase not configured — use fallbacks
  }

  const contactLinks = [
    { icon: Mail, label: "EMAIL", value: email, href: `mailto:${email}` },
    { icon: Code2, label: "GITHUB", value: githubUrl.replace("https://", ""), href: githubUrl },
    { icon: Briefcase, label: "LINKEDIN", value: linkedinUrl.replace("https://www.linkedin.com/in/", "linkedin.com/in/"), href: linkedinUrl },
  ];

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
        {/* Client form island */}
        <div className="lg:col-span-2 bg-background">
          <ContactForm />
        </div>

        {/* Dynamic contact links from profile */}
        <div className="bg-background p-8 md:p-12 flex flex-col gap-0">
          {contactLinks.map((item) => (
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
