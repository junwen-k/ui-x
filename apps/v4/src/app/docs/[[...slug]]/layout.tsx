import { AppSidebar } from "@/components/layout/app-sidebar";
import { getNavGroups } from "@/config/nav";
import { source } from "@/lib/source";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 md:px-8">
      <div className="mx-auto flex max-w-screen-2xl">
        <AppSidebar groups={getNavGroups(source.pageTree)} />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
