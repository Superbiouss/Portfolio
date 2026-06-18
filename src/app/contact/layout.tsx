import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Aakash Yadav — available for freelance projects, collaborations, and full-time opportunities.",
  openGraph: {
    title: "Contact Aakash Yadav",
    description: "Available for freelance projects, collaborations, and full-time opportunities.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
