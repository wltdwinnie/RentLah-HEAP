"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { QUICK_FILTER_CONFIGS } from "@/lib/filter-utils";

interface PriceRangeFilterProps {
  minPrice?: number;
  maxPrice?: number;
  onChange?: (min: number, max: number) => void;
  className?: string;
}

export function PriceRangeFilter({
  minPrice = 0,
  maxPrice = 0,
  onChange,
  className,
}: PriceRangeFilterProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleSelect = (min: number, max: number) => {
    onChange?.(min, max);
  };

  // Find the current selected range
  const currentRange = QUICK_FILTER_CONFIGS.PRICE_RANGES.find((range) => {
    // For "All Prices", both min and max should be 0
    if (range.label === "All Prices") {
      return minPrice === 0 && maxPrice === 0;
    }
    // For other ranges, match normally
    return range.min === minPrice && range.max === maxPrice;
  });

  const displayValue =
    currentRange?.label ||
    ((minPrice > 0 || maxPrice > 0) && minPrice !== maxPrice
      ? `$${minPrice.toLocaleString()} - $${
          maxPrice > 5000 ? "∞" : maxPrice.toLocaleString()
        }`
      : "All Prices");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "w-[144px] justify-center inline-flex h-9 items-center rounded-full border border-[hsl(var(--primary))] bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          className
        )}
      >
        {mounted ? displayValue : "All Prices"}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-xl bg-white text-black dark:bg-black dark:text-white">
        {QUICK_FILTER_CONFIGS.PRICE_RANGES.map((range, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => handleSelect(range.min, range.max)}
            className={currentRange === range ? "bg-accent" : ""}
          >
            {range.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
