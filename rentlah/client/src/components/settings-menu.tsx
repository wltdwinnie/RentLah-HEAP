"use client";

import { useState, useRef, useEffect } from "react";
import { Settings } from "lucide-react";
import { useTheme } from "next-themes";
import styles from "./settings-menu.module.css";

const SettingsMenu = () => {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<null | "language" | "account">(null);

  const { theme, setTheme } = useTheme();
  const toggleDarkMode = () => setTheme(theme === "dark" ? "light" : "dark");

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(ev: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(ev.target as Node)) {
        setOpen(false);
        setActiveMenu(null);
      }
    }

    function handleScroll() {
      setOpen(false);
      setActiveMenu(null);
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, true); // true = capture inside scrollable containers

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  const toggleMenu = (menu: "language" | "account") =>
    setActiveMenu((prev) => (prev === menu ? null : menu));

  return (
    <div ref={wrapperRef} className={styles.settingsContainer}>
      {/* Settings Icon */}
      <button onClick={() => setOpen(!open)} className={styles.settingsButton}>
        <Settings className={styles.settingsIcon} />
      </button>

      {open && (
        <div className={styles.dropdown}>
          {/* Language */}
          <div>
            <div
              onClick={() => toggleMenu("language")}
              className={styles.menuItem}
            >
              <span>{activeMenu === "language" ? "▴" : "▾"}</span>
              <span>Language</span>
            </div>
            {activeMenu === "language" && (
              <div>
                <p className={styles.submenuItem}>English</p>
                <p className={styles.submenuItem}>Chinese</p>
              </div>
            )}
          </div>

          {/* My Account */}
          <div>
            <div
              onClick={() => toggleMenu("account")}
              className={styles.menuItem}
            >
              <span>{activeMenu === "account" ? "▴" : "▾"}</span>
              <span>My Account</span>
            </div>
            {activeMenu === "account" && (
              <div>
                <p className={styles.submenuItem}>View Profile</p>
                <p className={styles.submenuItem}>Edit Info</p>
              </div>
            )}
          </div>

          {/* Dark Mode Switch */}
          <div className={styles.darkModeSwitch}>
            <span>Dark Mode</span>
            <div
              onClick={toggleDarkMode}
              className={`${styles.switchTrack} ${theme === "dark" ? "bg-black" : "bg-gray-300"}`}
            >
              <div
                className={`${styles.switchThumb} ${theme === "dark" ? styles.switchThumbActive : ""}`}
              />
            </div>
          </div>

          {/* Log Out */}
          <p className={styles.logoutButton}>Log Out</p>
        </div>
      )}
    </div>
  );
};

export { SettingsMenu };