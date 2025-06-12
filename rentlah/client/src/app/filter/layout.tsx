"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/features/filter/app-sidebar";

interface FilterLayoutProps {
  children: React.ReactNode;
}

const FilterLayout = ({ children }: FilterLayoutProps) => {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="flex min-h-screen">
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1">{children}</main>
        </SidebarProvider>
      </div>
    </div>
  );
};

export default FilterLayout;
