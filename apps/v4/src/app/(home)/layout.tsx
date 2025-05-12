import { AppSidebar } from "@/components/layout/app-sidebar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AppSidebar className="data-[slot=sidebar-container]:hidden" />
      {children}
    </div>
  );
}
