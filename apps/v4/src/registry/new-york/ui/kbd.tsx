import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const kbdVariants = cva(
  "pointer-events-none inline-flex select-none items-center gap-1 rounded px-1.5 py-0.5 font-mono text-[10px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[inset_0_-2px_0_0_var(--shadow-color)] shadow-primary-foreground/60",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[inset_0_-2px_0_0_var(--shadow-color)] shadow-secondary-foreground/60",
        outline: "border text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Kbd({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"kbd"> &
  VariantProps<typeof kbdVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "kbd";

  return (
    <Comp
      data-slot="kbd"
      className={cn(kbdVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Kbd, kbdVariants };
