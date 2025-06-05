import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/features/filter/app-sidebar";
import { Navbar } from "@/components/ui/navbar";
import "@/styles/globals.css";

export const metadata = {
  title: "RentLah!",
  keywords: ["RentLah", "rent", "rental", "listing", "housing", "property"],
  description: "RentLah! - Rent anything, anywhere.",
};

interface MainLayoutProps {
  children: React.ReactNode;
}

const FilterLayout = ({ children }: MainLayoutProps) => {
  return (
    <html lang="en">
      <body>
        <div className="relative flex min-h-screen flex-col">
          <div className="flex min-h-screen">
            <SidebarProvider>
              <AppSidebar />
              <main>{children}</main>
            </SidebarProvider>
          </div>
        </div>
      </body>
    </html>
  );
};

export default FilterLayout;
