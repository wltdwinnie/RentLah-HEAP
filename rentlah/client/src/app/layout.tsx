import type { Metadata } from "next";
import { ThemeProvider } from "../components/theme-provider";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "RentLah",
  description: "Find your next home easily!",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}