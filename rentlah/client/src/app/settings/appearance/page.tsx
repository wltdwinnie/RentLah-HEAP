"use client";

import { useTheme } from "next-themes";

export default function AppearancePage() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <h1 className="text-lg font-semibold mb-2">Appearance</h1>
      <div className="flex gap-4 mt-2">
        <button onClick={() => setTheme("light")}>Light</button>
        <button onClick={() => setTheme("dark")}>Dark</button>
      </div>
    </div>
  );
}
