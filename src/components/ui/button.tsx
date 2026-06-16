import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap uppercase tracking-tighter font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        /** Primary — Acid yellow, black text, hard scale. The singular CTA. */
        primary:
          "bg-accent text-accent-foreground hover:scale-105 active:scale-95",
        /** Outline — 2px zinc border, transparent → fills white on hover, text inverts. */
        outline:
          "border-2 border-border bg-transparent text-foreground hover:bg-foreground hover:text-background",
        /** Ghost — No border, off-white text, hover turns accent. */
        ghost:
          "text-foreground hover:text-accent",
      },
      size: {
        default: "h-14 px-8 py-4 text-base",
        sm: "h-10 px-4 py-2 text-sm",
        lg: "h-20 px-12 py-6 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
