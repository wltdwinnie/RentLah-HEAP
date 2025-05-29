export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center py-4 bg-gray-50">
      <div className="mb-2 text-sm text-gray-600">
        &copy; {new Date().getFullYear()} RentLah. All rights reserved.
      </div>
      <div className="flex gap-4">
        {/* Social media placeholders */}
        <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">F</span>
        <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">T</span>
        <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">I</span>
      </div>
    </footer>
  );
}
