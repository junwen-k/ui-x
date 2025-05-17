"use client"

import * as React from "react"
import Link from "next/link"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/new-york/ui/dropdown-menu"

const VERSION_OPTIONS = [
  {
    value: process.env.NEXT_PUBLIC_APP_URL_V4!,
    label: "Tailwind v4",
  },
  {
    value: process.env.NEXT_PUBLIC_APP_URL!,
    label: "Tailwind v3",
  },
] as const

export function VersionDropdownMenu(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.Root>
) {
  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger
        className={cn(
          "flex cursor-pointer items-center justify-between gap-2 rounded-full border bg-muted py-0.5 pl-2 pr-0.5",
          "text-sm font-medium text-muted-foreground"
        )}
      >
        v3
        <div className="flex size-5 items-center justify-center rounded-full border">
          <ChevronDownIcon className="size-4 opacity-50" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {VERSION_OPTIONS.map((option) => (
          <DropdownMenuItem key={option.value} asChild>
            <Link href={option.value}>{option.label}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
