"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { GithubButton } from "@/components/github-button";
import { ModeSwitcher } from "@/components/mode-switcher";
import { Separator } from "@/components/ui/separator";
// import { SidebarTrigger } from "@/components/ui/sidebar";
import { UiXLogo } from "@/components/ui-x-logo";
import { docsConfig } from "@/config/docs";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="bg-background/80 sticky top-0 z-10 flex shrink-0 items-center justify-between gap-2 border-b border-dashed px-4 py-3 backdrop-blur">
      <Link href="/" className="flex items-center gap-2">
        <UiXLogo className="size-5" />
        <span className="hidden font-bold lg:inline-block">junwen-k/ui-x</span>
        {/* <SidebarTrigger className="inline-flex md:hidden" /> */}
      </Link>
      <div className="flex items-center gap-4">
        <nav className="flex items-center gap-6 text-sm">
          {docsConfig.mainNav.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                "hover:text-foreground/80 transition-colors",
                pathname === item.href
                  ? "text-foreground"
                  : "text-foreground/60",
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <Separator
          orientation="vertical"
          className="data-[orientation=vertical]:h-5"
        />
        <div className="flex items-center gap-0.5">
          <GithubButton />
          <ModeSwitcher />
        </div>
      </div>
    </header>
  );
}
