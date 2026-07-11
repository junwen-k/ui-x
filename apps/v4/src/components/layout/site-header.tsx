"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { CommandMenu } from "@/components/command-menu";
import { GithubButton } from "@/components/github-button";
import { ModeSwitcher } from "@/components/mode-switcher";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UiXLogo } from "@/components/ui-x-logo";
import { VersionDropdownMenu } from "@/components/version-dropdown-menu";
import { NavGroup, mainNav } from "@/config/nav";
import { cn } from "@/lib/utils";

interface SiteHeaderProps {
  groups: NavGroup[];
}

export function SiteHeader({ groups }: SiteHeaderProps) {
  const pathname = usePathname();

  const activeItem = mainNav.findLast((item) => pathname.startsWith(item.href));

  return (
    <header className="bg-background/80 sticky top-0 isolate z-10 border-b border-dashed backdrop-blur md:px-8">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-4 border-x border-dashed px-4 py-3">
        <div className="flex items-center gap-6">
          <Link href="/" className="hidden items-center gap-2 md:flex">
            <UiXLogo className="size-5" />
            <span className="hidden font-bold lg:inline-block">
              junwen-k/ui-x
            </span>
          </Link>
          <SidebarTrigger className="md:hidden" />
          <VersionDropdownMenu className="hidden sm:inline-flex" />
          <nav className="hidden items-center gap-6 text-sm md:flex">
            {mainNav.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  "hover:text-foreground/80 transition-colors",
                  activeItem?.href === item.href
                    ? "text-foreground"
                    : "text-foreground/60",
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center gap-4 sm:flex-none">
          <ModeSwitcher className="hidden lg:inline-flex" />
          <CommandMenu groups={groups} />
          <div className="flex items-center gap-0.5">
            <GithubButton />
          </div>
        </div>
      </div>
    </header>
  );
}
