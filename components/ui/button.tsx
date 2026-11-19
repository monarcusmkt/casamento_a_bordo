import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft hover:shadow-elevated",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-soft",
        ghost: "hover:bg-muted hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Hero button - Gold accent with glow
        hero: "bg-gradient-sunset text-primary-foreground shadow-gold hover:shadow-elevated hover:scale-105 font-bold tracking-wide",
        // Ocean gradient button
        ocean: "bg-gradient-ocean text-primary-foreground shadow-soft hover:shadow-elevated hover:scale-105",
        // Elegant outline with gold
        elegant: "border-2 border-gold bg-transparent text-gold hover:bg-gold hover:text-primary-foreground font-semibold",
        // White/Pearl for dark backgrounds
        pearl: "bg-pearl text-primary shadow-soft hover:shadow-elevated hover:bg-pearl/90",
      },
      size: {
        default: "h-11 px-6 py-2 rounded-2xl",
        sm: "h-9 px-4 rounded-2xl",
        lg: "h-12 px-8 text-sm rounded-2xl",
        xl: "h-14 px-10 text-base rounded-2xl",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
