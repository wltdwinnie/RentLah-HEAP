import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import "@/styles/globals.css";
import I18nProvider from "@/components/i18n-provider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RentLah",
  description: "Find your next home easily!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-white text-black dark:bg-zinc-900 dark:text-white transition-colors duration-300 antialiased`}
      >
        <I18nProvider>
          <NuqsAdapter>{children}</NuqsAdapter>
        </I18nProvider>
      </body>
    </html>
  );
}