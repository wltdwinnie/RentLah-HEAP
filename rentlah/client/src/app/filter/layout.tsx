"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/features/filter/app-sidebar";
import Header from "@/components/layouts/Header";

interface FilterLayoutProps {
  children: React.ReactNode;
}

const FilterLayout = ({ children }: FilterLayoutProps) => {
  return (
    <>
      <Header />
      <div className="relative flex min-h-screen flex-col pt-[70px]">
        {/* <div className="flex min-h-screen"> */}
          <SidebarProvider>
            <AppSidebar />
            <main>{children}</main>
          </SidebarProvider>
        {/* </div> */}
      </div>
    </>
  );
};

export default FilterLayout;
