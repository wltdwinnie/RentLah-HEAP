import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-full border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

interface CurrencyInputProps
  extends Omit<React.ComponentProps<"input">, "onChange"> {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ className, value, onChange, min = 0, max = Infinity, step = 1, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value);
      if (!isNaN(value) && value >= min && value <= max) {
        onChange(value);
      }
    };

    return (
      <div className="relative rounded-full">
        <Input
          type="number"
          value={value}
          onChange={handleChange}
          step={step}
          className={cn("h-8 w-30", className)}
          ref={ref}
          min={min}
          max={max}
          {...props}
        />
        {/* <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
          $
        </span> */}
      </div>
    );
  }
);
CurrencyInput.displayName = "CurrencyInput";

export { Input, CurrencyInput };
