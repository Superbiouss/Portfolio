import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-[95vw] mx-auto py-32 md:py-48 min-h-[80vh] flex flex-col justify-center">
      <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-muted-foreground block mb-4">ERROR</span>
      <h1 className="text-[clamp(6rem,20vw,20rem)] font-extrabold uppercase tracking-tighter leading-none text-foreground/10 select-none">
        404
      </h1>
      <div className="mt-8 border-t-2 border-border pt-8">
        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-4">
          PAGE NOT <span className="text-accent">FOUND</span>
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-lg">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button variant="primary" asChild>
          <Link href="/"><ArrowLeft className="mr-3 w-5 h-5" /> BACK TO HOME</Link>
        </Button>
      </div>
    </div>
  );
}
