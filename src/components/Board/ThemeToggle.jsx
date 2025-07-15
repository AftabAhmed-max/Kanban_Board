// ThemeToggle.jsx
import styles from './ThemeToggle.module.css';

const ThemeToggle = ({ theme, setTheme }) => (
  <button
    className={styles.toggleBtn}
    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    aria-label="Toggle theme"
    title="Toggle theme"
  >
    {theme === "dark" ? (
      // Sun SVG for dark theme
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="7" fill="#FFD600" stroke="#FFB300" strokeWidth="2"/>
        <g stroke="#FFD600" strokeWidth="2">
          <line x1="14" y1="2" x2="14" y2="6"/>
          <line x1="14" y1="22" x2="14" y2="26"/>
          <line x1="2" y1="14" x2="6" y2="14"/>
          <line x1="22" y1="14" x2="26" y2="14"/>
          <line x1="6.93" y1="6.93" x2="9.76" y2="9.76"/>
          <line x1="18.24" y1="18.24" x2="21.07" y2="21.07"/>
          <line x1="6.93" y1="21.07" x2="9.76" y2="18.24"/>
          <line x1="18.24" y1="9.76" x2="21.07" y2="6.93"/>
        </g>
      </svg>
    ) : (
      // Moon SVG for light theme
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path
          d="M22.5 18.5C19.5 19.5 15.5 19 12.5 16C9.5 13 9 9 10 5.5C6.5 6.5 4 9.74 4 13.5C4 18.19 8.06 22 13 22C16.12 22 18.86 20.54 20.65 18.15Z"
          fill="none"
          stroke="#6574CF"
          strokeWidth="2"
        />
      </svg>
    )}
  </button>
);

export default ThemeToggle;
