"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const VERSION_OPTIONS = [
  {
    value: process.env.NEXT_PUBLIC_APP_URL_V4!,
    label: "Tailwind v4",
  },
  {
    value: process.env.NEXT_PUBLIC_APP_URL!,
    label: "Tailwind v3",
  },
] as const;

export function VersionDropdownMenu(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.Root>,
) {
  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger
        className={cn(
          "bg-muted focus-visible:ring-ring flex cursor-pointer items-center justify-between gap-2 rounded-full border py-0.5 pr-0.5 pl-2 focus-visible:ring-1",
          "text-muted-foreground text-sm font-medium",
        )}
      >
        v4
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
  );
}
