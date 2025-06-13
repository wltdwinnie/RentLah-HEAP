"use client";

import { useEffect } from "react";


type NotificationProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Notification({ isOpen, onClose }: NotificationProps) {
  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className={`fixed inset-y-0 right-0 w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="font-bold text-lg">Notifications</h2>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          ✕
        </button>
      </div>
      <div className="p-4 text-gray-500">
        No notifications yet.
      </div>
    </div>
  );
}
