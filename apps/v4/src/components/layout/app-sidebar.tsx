"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { NavGroup } from "@/config/nav";
import { cn } from "@/lib/utils";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  groups: NavGroup[];
}

export function AppSidebar({ groups, className, ...props }: AppSidebarProps) {
  const pathname = usePathname();

  const activeItem = groups
    .flatMap((group) => group.items)
    .findLast((item) => pathname.startsWith(item.href));

  return (
    <Sidebar
      className={cn("sticky top-14 z-0 border-x border-dashed", className)}
      {...props}
    >
      <SidebarContent className="mask-t-from-98% [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {groups.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem key={group.title}>
                  {group.items?.length && (
                    <SidebarMenuSub className="border-none pl-0">
                      {group.items.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuSubButton
                            isActive={activeItem?.href === item.href}
                            render={<Link href={item.href} />}
                          >
                            {item.title}
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
