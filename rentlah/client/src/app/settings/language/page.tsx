"use client";

import { useState } from "react";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" }
];

export default function LanguagePage() {
  const [selected, setSelected] = useState("en");

  const handleLanguageChange = (langCode: string) => {
    setSelected(langCode);
  };

  return (
    <div className="p-6">
      <h1 className="text-lg font-semibold mb-4">Language</h1>
      <p className="text-sm text-gray-500 mb-4">Select a language</p>

      <div className="space-y-3">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`w-full flex items-center justify-between px-4 py-2 rounded border transition ${
              selected === lang.code
                ? "bg-zinc-200 dark:bg-zinc-700 border-transparent"
                : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Outer circle */}
              <div className="w-4 h-4 rounded-full border border-black flex items-center justify-center">
                {selected === lang.code && (
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                )}
              </div>
              {lang.name}
            </div>
            <span className="text-xl">{lang.flag}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
