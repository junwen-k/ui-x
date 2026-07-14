"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { PAGES_NEW } from "@/lib/docs";
import { cn } from "@/lib/utils";

export function MainNav({
  items,
  className,
  ...props
}: React.ComponentProps<"nav"> & {
  items: readonly { href: string; label: string }[];
}) {
  const pathname = usePathname();

  return (
    <nav className={cn("items-center gap-0", className)} {...props}>
      {items.map((item) => (
        <Button
          key={item.href}
          variant="ghost"
          size="sm"
          className="px-2.5"
          nativeButton={false}
          render={
            <Link
              href={item.href}
              data-active={pathname === item.href}
              data-new={PAGES_NEW.includes(item.href)}
              className="relative items-center data-[new=true]:after:absolute data-[new=true]:after:top-0 data-[new=true]:after:right-0 data-[new=true]:after:size-1.5 data-[new=true]:after:rounded-full data-[new=true]:after:bg-blue-500 data-[new=true]:after:content-['']"
            >
              {item.label}
            </Link>
          }
        />
      ))}
    </nav>
  );
}
