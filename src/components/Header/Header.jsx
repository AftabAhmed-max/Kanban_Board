import styles from './Header.module.css';
import { FiBell, FiSettings, FiSun, FiMoon, FiUser, FiLogOut } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import ThemeToggle from '../Board/ThemeToggle';

const Header = ({ theme, setTheme, filter, setFilter, sort, setSort }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  // Close avatar menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <span className={styles['header-title']}>Kanban Board</span>
      </div>
      <div className={styles.right}>
        <ThemeToggle theme={theme} setTheme={setTheme} />
        <FiBell className={styles.icon} title="Notifications" />
        <FiSettings className={styles.icon} title="Settings" />

        {/* Avatar + menu */}
        <div className={styles.avatarWrapper} ref={menuRef}>
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Profile"
            className={styles.avatar}
            tabIndex={0}
            onClick={() => setMenuOpen(v => !v)}
            onKeyDown={e => { if (e.key === "Enter") setMenuOpen(v => !v); }}
          />
          {menuOpen && (
            <div className={styles.menu}>
              <div className={styles.menuHeader}>
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Profile"
                  className={styles.menuAvatar}
                />
                <div>
                  <div className={styles.menuName}>Aftab Siddiqui</div>
                  <div className={styles.menuEmail}>aftab@email.com</div>
                </div>
              </div>
              <button className={styles.menuItem}>
                <FiUser /> Profile
              </button>
              <button className={styles.menuItem}>
                <FiSettings /> Settings
              </button>
              <button className={styles.menuItem}>
                <FiLogOut /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
