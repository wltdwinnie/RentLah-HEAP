"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Navbar({
  className,
  ...props
}: React.ComponentProps<"nav">) {
  return (
    <nav
      className={cn(
        "flex h-16 items-center border-b border-gray-200 px-4 bg-white",
        className
      )}
      {...props}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xl font-semibold">
            RentLah!
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/properties" className="text-sm hover:text-gray-600">
              Properties
            </Link>
            <Link href="/about" className="text-sm hover:text-gray-600">
              About
            </Link>
            <Link href="/contact" className="text-sm hover:text-gray-600">
              Contact
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Input
              type="search"
              placeholder="Search properties..."
              className="w-[300px]"
            />
          </div>
          <Button variant="outline" className="hidden md:inline-flex">
            Log in
          </Button>
          <Button>Sign up</Button>
        </div>
      </div>
    </nav>
  );
}
