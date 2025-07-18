"use client";

import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import { NuqsAdapter } from "nuqs/adapters/next/app";

interface FilterLayoutProps {
  children: React.ReactNode;
}

const FilterLayout = ({ children }: FilterLayoutProps) => {
  return (
    <>
      <Header />
      <div className="relative flex min-h-screen flex-col">
        <div>
          <main>
            <NuqsAdapter>{children}</NuqsAdapter>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default FilterLayout;
