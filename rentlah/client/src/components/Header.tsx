import Image from 'next/image';
import styles from './Header.module.css';
import { SettingsMenu } from './settings-menu';




export default function Header() {
  return (
    <header className={styles.header}>

      {/* Temporary logo */}
      <div className={styles.logoContainer}>
        <Image src="/assets/logo.png" alt="RentLah Logo" width={200} height={50} />
      </div>

      {/* Search Bar with Dropdown */}
      <div className={styles.searchContainer}>
        <div className={styles.dropdownWrapper}>
          <input
            type="text"
            placeholder="Search your university"
            className={styles.searchInput}
            readOnly
          />
          <ul className={styles.dropdown}>
            <li>National University of Singapore (NUS)</li>
            <li>Nanyang Technological University (NTU)</li>
            <li>Singapore Management University (SMU)</li>
            <li>Singapore University of Technology and Design (SUTD)</li>
            <li>Singapore Institute of Technology (SIT)</li>
            <li>Singapore University of Social Sciences (SUSS)</li>
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div className={styles.actions}>
        <button className={styles.bell}>⩍</button>
       

        <button className="px-4 py-2 rounded bg-white text-black hover:bg-gray-100 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-700 transition-colors">
          Login
        </button>


        <button className={styles.signup}>Sign Up</button>
        {/* Settings icon dropdown */}
        <div className="ml-4 bg-white dark:bg-zinc-900 rounded p-1 transition-colors">
          <SettingsMenu />
        </div>

      </div>
    </header >
  );
}
