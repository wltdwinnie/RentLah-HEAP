import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Navbar } from "@/components/ui/navbar";
import '@/assets/styles/globals.css';

export const metadata = {
  title: "RentLah!",
  keywords: ["RentLah", "rent", "rental", "listing", "housing", "property"],
  description: "RentLah! - Rent anything, anywhere.",
};

interface MainLayoutProps {
  children: React.ReactNode
}

const FilterLayout = ({children}: MainLayoutProps) => {
  return (
    <html lang="en">
      <body>
        <div className="relative flex min-h-screen flex-col">
          <div className="fixed top-0 left-0 right-0 z-50 border-b">
            <Navbar />
          </div>
          <div className="flex min-h-screen pt-[64px]">
            <SidebarProvider>
              <AppSidebar />
              <main>
                {children}
              </main>
            </SidebarProvider>
          </div>
        </div>
      </body>
    </html>
  );
};

export default FilterLayout;
