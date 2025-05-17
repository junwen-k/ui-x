import { SiTailwindcss } from "@icons-pack/react-simple-icons";
import { ChevronRight, Dot } from "lucide-react";
import Link from "next/link";

import { badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function Announcement() {
  return (
    <Link
      href="/docs/tailwind-v4"
      className={cn(badgeVariants({ variant: "outline" }), "group")}
    >
      <SiTailwindcss className="mr-1 fill-sky-400 text-sky-400" />
      <span className="font-medium">Introducing Tailwind v4</span>
      <Dot className="text-muted-foreground hidden size-4 sm:inline" />
      <span className="text-muted-foreground hidden sm:inline">Learn more</span>
      <ChevronRight className="text-muted-foreground size-3.5 transition-transform group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5" />
    </Link>
  );
}
