"use client";

import type * as PageTree from "fumadocs-core/page-tree";
import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PAGES_NEW } from "@/lib/docs";
import { getOwnSectionsFromFolder, getTopLevelSections } from "@/lib/page-tree";
import { cn } from "@/lib/utils";

export function MobileNav({
  tree,
  items,
  className,
}: {
  tree: PageTree.Root;
  items: readonly { href: string; label: string }[];
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            className={cn(
              "extend-touch-target h-8 touch-manipulation items-center justify-start gap-2.5 p-0! hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent dark:hover:bg-transparent",
              className,
            )}
          >
            <div className="relative flex h-8 w-4 items-center justify-center">
              <div className="relative size-4">
                <span
                  className={cn(
                    "absolute left-0 block h-0.5 w-4 bg-foreground transition-all duration-100",
                    open ? "top-[0.4rem] -rotate-45" : "top-1",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 block h-0.5 w-4 bg-foreground transition-all duration-100",
                    open ? "top-[0.4rem] rotate-45" : "top-2.5",
                  )}
                />
              </div>
              <span className="sr-only">Toggle Menu</span>
            </div>
            <span className="flex h-8 items-center text-lg leading-none font-medium">
              Menu
            </span>
          </Button>
        }
      />
      <PopoverContent
        className="no-scrollbar h-(--available-height) w-(--available-width) overflow-y-auto rounded-none border-none bg-background/90 p-0 shadow-none backdrop-blur duration-100 data-open:animate-none!"
        align="start"
        side="bottom"
        alignOffset={-16}
        sideOffset={14}
      >
        <div className="flex flex-col gap-12 overflow-auto px-6 py-6">
          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium text-muted-foreground">
              Menu
            </div>
            <div className="flex flex-col gap-3">
              <MobileLink href="/" onOpenChange={setOpen}>
                Home
              </MobileLink>
              {items.map((item) => (
                <MobileLink
                  key={item.href}
                  href={item.href}
                  onOpenChange={setOpen}
                >
                  {item.label}
                </MobileLink>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium text-muted-foreground">
              Sections
            </div>
            <div className="flex flex-col gap-3">
              {getTopLevelSections(tree).map((section) => (
                <MobileLink
                  key={section.url}
                  href={section.url}
                  onOpenChange={setOpen}
                >
                  {section.name}
                </MobileLink>
              ))}
            </div>
          </div>
          {tree.children.flatMap((group) => {
            if (group.type !== "folder") {
              return null;
            }

            return getOwnSectionsFromFolder(group).map((section, index) => (
              <div
                key={`${group.$id}-${index}`}
                className="flex flex-col gap-4"
              >
                <div className="text-sm font-medium text-muted-foreground">
                  {section.name ?? group.name}
                </div>
                <div className="flex flex-col gap-3">
                  {section.pages.map((page) => (
                    <MobileLink
                      key={page.url}
                      href={page.url}
                      onOpenChange={setOpen}
                    >
                      {page.name}
                      {PAGES_NEW.includes(page.url) && (
                        <span className="flex size-2 rounded-full bg-blue-500" />
                      )}
                    </MobileLink>
                  ))}
                </div>
              </div>
            ));
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: LinkProps & {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();

  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn("flex items-center gap-2 text-2xl font-medium", className)}
      {...props}
    >
      {children}
    </Link>
  );
}
