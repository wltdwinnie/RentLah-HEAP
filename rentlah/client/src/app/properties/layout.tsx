"use client";

import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

interface PropertiesLayoutProps {
  children: React.ReactNode;
}

const FilterLayout = ({ children }: PropertiesLayoutProps) => {
  return (
    <>
      <Header />
      <div className="relative flex min-h-screen flex-col">
        <div>
          <main>{children}</main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default FilterLayout;
