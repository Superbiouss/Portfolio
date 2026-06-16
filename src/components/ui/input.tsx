import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "w-full bg-transparent text-foreground text-lg md:text-2xl font-bold uppercase tracking-tighter",
          "border-0 border-b-2 border-border px-0 py-4",
          "placeholder:text-muted placeholder:uppercase",
          "focus:outline-none focus:border-accent",
          "transition-colors duration-200",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "w-full bg-transparent text-foreground text-lg md:text-xl font-medium",
          "border-0 border-b-2 border-border px-0 py-4",
          "placeholder:text-muted",
          "focus:outline-none focus:border-accent",
          "transition-colors duration-200 min-h-[120px] resize-y",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Input, Textarea };
