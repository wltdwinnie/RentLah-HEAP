
import Footer from "@/components/layouts/Footer";

export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 flex justify-center items-center px-4">
        {children}
      </main>
      <Footer />
    </div>
  );
}
