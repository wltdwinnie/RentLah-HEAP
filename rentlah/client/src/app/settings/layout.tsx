import SettingsSidebar from "@/components/features/SettingsSidebar";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <SettingsSidebar />
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}
