import { AppSidebar } from "@/components/layout/app-sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="md:px-8">
      <div className="mx-auto flex max-w-screen-2xl">
        <AppSidebar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
