import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saved Properties | RentLah",
  description: "View your saved properties",
};

export default function SavedPropertiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
