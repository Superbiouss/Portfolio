"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "@/app/actions/auth";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    const result = await login(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link href="/"><ArrowLeft className="mr-2 w-4 h-4" /> BACK</Link>
        </Button>

        <div className="border-2 border-border p-8 md:p-12">
          <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-2">ADMIN</h1>
          <p className="text-sm text-muted-foreground uppercase tracking-widest mb-8">SIGN IN TO MANAGE YOUR PORTFOLIO</p>

          {error && (
            <div className="border-2 border-accent bg-accent/10 text-accent px-4 py-3 text-sm font-bold uppercase tracking-widest mb-6">
              {error}
            </div>
          )}

          <form action={handleSubmit} className="space-y-8">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">EMAIL</label>
              <Input name="email" type="email" placeholder="ADMIN@EXAMPLE.COM" required className="text-lg" />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-3">PASSWORD</label>
              <Input name="password" type="password" placeholder="••••••••" required className="text-lg !normal-case" />
            </div>
            <Button variant="primary" type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "SIGNING IN..." : "SIGN IN"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
