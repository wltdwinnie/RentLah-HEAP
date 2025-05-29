// components/Header.tsx
import Image from 'next/image';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-md bg-white sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center">
        <Image src="/assets/logo.png" alt="RentLah Logo" width={200} height={60} />
      </div>
      {/* Search Bar */}
      <div className="flex-1 flex justify-center">
        <input
          type="text"
          placeholder="Search for homes, locations..."
          className="w-full max-w-md px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {/* Icons */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="p-2 rounded-full hover:bg-gray-100">
          <span role="img" aria-label="Notifications">&#128276;</span>
        </button>
        {/* Login/Signup */}
        <button className="px-4 py-2 rounded-full border font-semibold hover:bg-gray-100">
          Login
        </button>
        <button className="px-4 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700">
          Sign Up
        </button>
      </div>
    </header>
  );
}
