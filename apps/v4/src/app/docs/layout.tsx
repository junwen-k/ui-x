"use client";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <div className="flex-1">
          <SiteHeader />
          <SidebarInset>
            {children}
            <SiteFooter />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </>
  );
}
