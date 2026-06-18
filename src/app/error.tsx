"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-[95vw] mx-auto py-32 md:py-48 min-h-[80vh] flex flex-col justify-center">
      <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-muted-foreground block mb-4">RUNTIME ERROR</span>
      <h1 className="text-[clamp(4rem,15vw,15rem)] font-extrabold uppercase tracking-tighter leading-none text-foreground/10 select-none">
        ERROR
      </h1>
      <div className="mt-8 border-t-2 border-border pt-8">
        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-4">
          SOMETHING WENT <span className="text-accent">WRONG</span>
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-lg">
          An unexpected error occurred. Please try again or return to the homepage.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" onClick={reset}>
            TRY AGAIN
          </Button>
          <Button variant="outline" asChild>
            <Link href="/"><ArrowLeft className="mr-3 w-5 h-5" /> GO HOME</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
