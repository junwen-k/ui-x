"use client";

import type * as PageTree from "fumadocs-core/page-tree";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { PAGES_NEW } from "@/lib/docs";
import { getOwnPagesFromFolder, getTopLevelSections } from "@/lib/page-tree";

export function DocsSidebar({
  tree,
  ...props
}: React.ComponentProps<typeof Sidebar> & { tree: PageTree.Root }) {
  const pathname = usePathname();

  return (
    <Sidebar
      className="sticky top-[calc(var(--header-height)+0.6rem)] z-30 hidden h-[calc(100svh-10rem)] overflow-hidden overscroll-none bg-transparent [--sidebar-menu-width:--spacing(56)] lg:flex"
      collapsible="none"
      {...props}
    >
      <SidebarContent className="scroll-fade scrollbar-none w-(--sidebar-menu-width) overflow-x-hidden pl-2.5">
        <SidebarGroup className="pt-12">
          <SidebarGroupLabel className="font-medium text-muted-foreground">
            Sections
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {getTopLevelSections(tree).map((section) => (
                <SidebarMenuItem key={section.url}>
                  <SidebarMenuButton
                    isActive={
                      section.url === "/docs"
                        ? pathname === section.url
                        : pathname.startsWith(section.url)
                    }
                    className="relative h-[30px] w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md data-[active=true]:border-accent data-[active=true]:bg-accent 3xl:fixed:w-full 3xl:fixed:max-w-48"
                    render={
                      <Link href={section.url}>
                        <span className="absolute inset-0 flex w-(--sidebar-menu-width) bg-transparent" />
                        {section.name}
                        {PAGES_NEW.includes(section.url) && (
                          <span
                            className="flex size-2 rounded-full bg-blue-500"
                            title="New"
                          />
                        )}
                      </Link>
                    }
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {tree.children.map((item) => {
          if (item.type !== "folder") {
            return null;
          }

          return (
            <SidebarGroup key={item.$id}>
              <SidebarGroupLabel className="font-medium text-muted-foreground">
                {item.name}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="gap-0.5">
                  {getOwnPagesFromFolder(item).map((page) => (
                    <SidebarMenuItem key={page.url}>
                      <SidebarMenuButton
                        isActive={page.url === pathname}
                        className="relative h-[30px] w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md data-[active=true]:border-accent data-[active=true]:bg-accent 3xl:fixed:w-full 3xl:fixed:max-w-48"
                        render={
                          <Link href={page.url}>
                            <span className="absolute inset-0 flex w-(--sidebar-menu-width) bg-transparent" />
                            {page.name}
                            {PAGES_NEW.includes(page.url) && (
                              <span
                                className="flex size-2 rounded-full bg-blue-500"
                                title="New"
                              />
                            )}
                          </Link>
                        }
                      />
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}
