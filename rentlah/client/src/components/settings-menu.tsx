"use client";
import { useState } from 'react';
import { Settings } from 'lucide-react';
import styles from './settings-menu.module.css';

// export default function SettingsMenu() {
const SettingsMenu = () => {
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
    <div className={styles.settingsContainer}>
      {/* Settings Icon */}
      <button onClick={() => setOpen(!open)} className={styles.settingsButton}>
        <Settings className={styles.settingsIcon} />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className={styles.dropdown}>
          {/* Language */}
          <div>
            <div
              onClick={() => toggleMenu('language')}
              className={styles.menuItem}
            >
              <span>{activeMenu === 'language' ? '▴' : '▾'}</span>
              <span>Language</span>
            </div>
            {activeMenu === 'language' && (
              <div>
                <p className={styles.submenuItem}>English</p>
                <p className={styles.submenuItem}>Chinese</p>
              </div>
            )}
          </div>

          {/* My Account */}
          <div>
            <div
              onClick={() => toggleMenu('account')}
              className={styles.menuItem}
            >
              <span>{activeMenu === 'account' ? '▴' : '▾'}</span>
              <span>My Account</span>
            </div>
            {activeMenu === 'account' && (
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
              className={`${styles.switchTrack} ${darkMode ? 'bg-black' : 'bg-gray-300'}`}
            >
              <div
                className={`${styles.switchThumb} ${darkMode ? styles.switchThumbActive : ''}`}
              />
            </div>
          </div>

          {/* Log Out */}
          <p className={styles.logoutButton}>Log Out</p>
        </div>
      )}
    </div>
  );
}

export { SettingsMenu };
