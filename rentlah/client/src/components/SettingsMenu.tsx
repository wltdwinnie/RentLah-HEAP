"use client";
import { useState } from 'react';
import { Settings } from 'lucide-react';

export default function SettingsMenu() {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<null | 'language' | 'account'>(null);
  const [darkMode, setDarkMode] = useState(false); 


  const toggleMenu = (menu: 'language' | 'account') => {
    setActiveMenu(prev => (prev === menu ? null : menu));
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Settings Icon */}
      <button onClick={() => setOpen(!open)} className="p-2">
        <Settings className="w-6 h-6 text-black" />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded p-2 z-50 text-sm">

          {/* Language */}
          <div>
            <div
              onClick={() => toggleMenu('language')}
              className="hover:bg-blue-100 px-2 py-1 cursor-pointer flex items-center gap-2"
            >
              <span>{activeMenu === 'language' ? '▴' : '▾'}</span>
              <span>Language</span>
            </div>
            {activeMenu === 'language' && (
              <div className="ml-6 mt-1">
                <p className="hover:bg-blue-100 px-2 py-1 cursor-pointer">English</p>
                <p className="hover:bg-blue-100 px-2 py-1 cursor-pointer">Chinese</p>
              </div>
            )}
          </div>

          {/* My Account */}
          <div>
            <div
              onClick={() => toggleMenu('account')}
              className="hover:bg-blue-100 px-2 py-1 cursor-pointer flex items-center gap-2"
            >
              <span>{activeMenu === 'account' ? '▴' : '▾'}</span>
              <span>My Account</span>
            </div>
            {activeMenu === 'account' && (
              <div className="ml-6 mt-1">
                <p className="hover:bg-blue-100 px-2 py-1 cursor-pointer">View Profile</p>
                <p className="hover:bg-blue-100 px-2 py-1 cursor-pointer">Edit Info</p>
              </div>
            )}
          </div>

          {/* Dark Mode Switch */}
          <div className="flex justify-between items-center px-2 py-1 hover:bg-blue-100 cursor-pointer">
            <span>Dark Mode</span>
            <div
              onClick={toggleDarkMode}
              className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                darkMode ? 'bg-black' : 'bg-gray-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                  darkMode ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </div>
          </div>

          {/* Log Out */}
          <p className="hover:bg-blue-100 px-2 py-1 text-red-500 cursor-pointer">Log Out</p>
        </div>
      )}
    </div>
  );
}
