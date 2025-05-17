import Link from "next/link"
import { SiTailwindcss } from "@icons-pack/react-simple-icons"
import { ChevronRight, Dot } from "lucide-react"

import { cn } from "@/lib/utils"
import { badgeVariants } from "@/registry/new-york/ui/badge"

export function Announcement() {
  return (
    <Link
      href={`${process.env.NEXT_PUBLIC_APP_URL_V4}/docs/tailwind-v4`}
      className={cn(badgeVariants({ variant: "outline" }), "group")}
    >
      <SiTailwindcss className="mr-2 size-3 fill-sky-400 text-sky-400" />
      <span className="font-medium">Introducing Tailwind v4</span>
      <Dot className="hidden size-4 text-muted-foreground sm:inline" />
      <span className="hidden text-muted-foreground sm:inline">Learn more</span>
      <ChevronRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5" />
    </Link>
  )
}
