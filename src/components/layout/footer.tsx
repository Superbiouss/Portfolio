import Link from "next/link";

const footerLinks = [
  {
    title: "PORTFOLIO",
    links: [
      { href: "/projects", label: "PROJECTS" },
      { href: "/skills", label: "SKILLS" },
      { href: "/certificates", label: "CERTIFICATES" },
      { href: "/resume", label: "RESUME" },
    ],
  },
  {
    title: "CONNECT",
    links: [
      { href: "/contact", label: "CONTACT" },
      { href: "/about", label: "ABOUT" },
      { href: "https://github.com/Superbiouss", label: "GITHUB" },
      { href: "https://www.linkedin.com/in/mr-yadav-aakash/", label: "LINKEDIN" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-accent text-accent-foreground border-t-2 border-accent-foreground mt-auto">
      <div className="max-w-[95vw] mx-auto py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand col */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="text-[clamp(2rem,6vw,5rem)] font-bold uppercase tracking-tighter leading-none block mb-4"
            >
              AAKASH YADAV
            </Link>
            <p className="text-lg text-accent-foreground/60 max-w-md">
              Full-stack developer specializing in modern web applications, AI-powered solutions, and scalable architectures.
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-accent-foreground/40 mb-4">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-bold uppercase tracking-tight text-accent-foreground/70 hover:text-accent-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t-2 border-accent-foreground/20 mt-12 pt-8 text-sm text-accent-foreground/40 uppercase tracking-widest">
          © {new Date().getFullYear()} AAKASH YADAV. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
}
