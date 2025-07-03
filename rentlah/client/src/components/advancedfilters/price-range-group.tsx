import { CurrencyInput } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface PriceRangeGroupProps {
  title: string;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  defaultExpanded?: boolean;
}

export function PriceRangeGroup({
  title,
  value,
  onChange,
  defaultExpanded = true,
}: PriceRangeGroupProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="p-2">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full py-1.5 text-gray-700 hover:bg-gray-50 rounded-sm transition-colors"
      >
        <span className="text-sm font-medium">{title}</span>
        {isExpanded ? (
          <ChevronDown className="text-gray-500" size={16} />
        ) : (
          <ChevronRight className="text-gray-500" size={16} />
        )}
      </button>
      {isExpanded && (
        <div className="mt-4 px-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-muted-foreground">
                min $/month
              </label>
              <CurrencyInput
                value={value[0]}
                onChange={(newValue) => {
                  if (newValue <= value[1]) {
                    onChange([newValue, value[1]]);
                  }
                }}
                min={0}
                max={5000}
                step={50}
                className="h-7 w-20"
              />
            </div>
            <span className="text-muted-foreground mt-6">to</span>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-muted-foreground">
                max $/month
              </label>
              <CurrencyInput
                value={value[1]}
                onChange={(newValue) => {
                  if (newValue >= value[0]) {
                    onChange([value[0], newValue]);
                  }
                }}
                min={0}
                max={5000}
                step={50}
                className="h-7 w-20"
              />
            </div>
          </div>
          <Slider
            value={value}
            min={0}
            max={5000}
            step={50}
            onValueChange={onChange}
            className="mt-2"
          />
        </div>
      )}
    </div>
  );
}
