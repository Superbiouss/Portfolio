import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "accent" | "muted" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center px-3 py-1 text-xs md:text-sm font-bold uppercase tracking-widest border-2 transition-colors duration-300",
        variant === "default" && "border-border text-foreground group-hover:border-accent-foreground group-hover:text-accent-foreground",
        variant === "accent" && "border-accent text-accent bg-accent/10",
        variant === "muted" && "border-border text-muted-foreground",
        variant === "outline" && "border-2 border-border text-foreground bg-transparent",
        className
      )}
      {...props}
    />
  );
}

export { Badge };
