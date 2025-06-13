"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/features/filter/app-sidebar";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

interface FilterLayoutProps {
  children: React.ReactNode;
}

const FilterLayout = ({ children }: FilterLayoutProps) => {
  return (
    <>
      <Header />
      <div className="relative flex min-h-screen flex-col">
        {/* <SidebarProvider>
          <AppSidebar /> */}
          <div>
            <main>{children}</main>
            <Footer />
          </div>
        {/* </SidebarProvider> */}
      </div>
    </>
  );
};

export default FilterLayout;
