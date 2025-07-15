import styles from './Sidebar.module.css';
import { FaThLarge, FaUserFriends, FaCog } from "react-icons/fa";
import { useState } from "react";

const Sidebar = () => {
  // Simple active state, 0 = dashboard, 1 = friends, 2 = settings
  const [active, setActive] = useState(0);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>KB</div>
      <nav className={styles.nav}>
        <button
          className={`${styles.navItem} ${active === 0 ? styles.active : ""}`}
          onClick={() => setActive(0)}
        >
          <FaThLarge />
        </button>
        <button
          className={`${styles.navItem} ${active === 1 ? styles.active : ""}`}
          onClick={() => setActive(1)}
        >
          <FaUserFriends />
        </button>
        <button
          className={`${styles.navItem} ${active === 2 ? styles.active : ""}`}
          onClick={() => setActive(2)}
        >
          <FaCog />
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
