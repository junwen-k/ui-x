import { AppSidebar } from "@/components/layout/app-sidebar";
import { getNavGroups } from "@/config/nav";
import { source } from "@/lib/source";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AppSidebar
        groups={getNavGroups(source.pageTree)}
        className="data-[slot=sidebar-container]:hidden"
      />
      {children}
    </div>
  );
}
