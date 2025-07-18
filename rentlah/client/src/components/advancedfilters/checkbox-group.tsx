"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface Option {
  id: string;
  label: string;
}

interface CheckboxGroupProps {
  title: string;
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

export function CheckboxGroup({
  title,
  options,
  selectedValues,
  onChange,
}: CheckboxGroupProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleOption = (optionId: string) => {
    const newValues = selectedValues.includes(optionId)
      ? selectedValues.filter((id) => id !== optionId)
      : [...selectedValues, optionId];
    onChange(newValues);
  };

  return (
    <div className="p-2">
      <button
        className="flex items-center justify-between w-full py-1.5 text-gray-700 hover:bg-gray-50 rounded-sm transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="text-sm font-medium dark:text-white">{title}</span>
        {isExpanded ? (
          <ChevronDown className="text-gray-500" size={16} />
        ) : (
          <ChevronRight className="text-gray-500" size={16} />
        )}
      </button>

      {isExpanded && (
        <div className="mt-1 space-y-1 pl-2">
          {options.map((option) => (
            <label
              key={option.id}
              className="flex items-center space-x-2 py-1 px-1 cursor-pointer hover:bg-gray-50 dark:text-white dark:hover:bg-gray-600 rounded-sm text-sm text-gray-700"
            >
              <input
                type="checkbox"
                className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600"
                checked={selectedValues.includes(option.id)}
                onChange={() => toggleOption(option.id)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
