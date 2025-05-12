import { AppSidebar } from "@/components/layout/app-sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-screen-2xl md:px-8 md:py-0">
      <AppSidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
