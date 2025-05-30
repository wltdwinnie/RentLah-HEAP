import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.contacts}>
        {/* Temporary links */}
        <a href="mailto:winleithawdar2005@gmail.com" className={styles.contactItem} title="Email">
          ✉️
        </a>
        <a href="https://instagram.com/winleithawdar" target="_blank" rel="noopener noreferrer" className={styles.contactItem} title="Instagram">
          🅾
        </a>
      </div>
      <div className={styles.text}>
        &copy; {currentYear} RentLah. All rights reserved.
      </div>
    </footer>
  );
}
