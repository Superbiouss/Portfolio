"use client";

import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { useState } from "react";
import { submitContactMessage } from "@/app/actions/contact";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError("");
    setIsLoading(true);
    const result = await submitContactMessage(formData);
    setIsLoading(false);
    if (result?.error) {
      setError(result.error);
    } else {
      setSubmitted(true);
    }
  }

  return (
    <div className="p-8 md:p-12">
      {submitted ? (
        <div className="text-center py-20">
          <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-4"><span className="text-accent">THANK YOU</span></h3>
          <p className="text-lg text-muted-foreground">Your message has been sent. I&apos;ll get back to you soon.</p>
        </div>
      ) : (
        <form action={handleSubmit} className="space-y-8">
          {/* Honeypot — hidden from real users, filled by bots */}
          <input type="text" name="_bot" tabIndex={-1} aria-hidden="true" className="hidden" autoComplete="off" />

          {error && (
            <div className="border-2 border-destructive bg-destructive/10 text-destructive px-4 py-3 text-sm font-bold uppercase tracking-widest">{error}</div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-4">NAME</label>
              <Input name="name" placeholder="YOUR NAME" required />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-4">EMAIL</label>
              <Input type="email" name="email" placeholder="YOU@EXAMPLE.COM" required />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-4">SUBJECT</label>
            <Input name="subject" placeholder="WHAT'S THIS ABOUT?" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-4">MESSAGE</label>
            <Textarea name="message" placeholder="Tell me about your project..." required />
          </div>
          <Button variant="primary" type="submit" size="lg" disabled={isLoading}>
            <Mail className="mr-3 w-5 h-5" /> {isLoading ? "SENDING..." : "SEND MESSAGE"}
          </Button>
        </form>
      )}
    </div>
  );
}
