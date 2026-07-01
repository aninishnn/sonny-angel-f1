import { NavLink } from 'react-router-dom';
import { FaFlagCheckered, FaSun, FaMoon, FaGlobeAmericas } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import styles from './Navbar.module.scss';

export default function Navbar() {
  const { isDark, toggleTheme, theme } = useTheme();
  const { t, toggleLang } = useLanguage();

  return (
    <header className={styles.navbar}>
      <NavLink to="/" className={styles.brand} aria-label={t('app.name')}>
        <FaFlagCheckered aria-hidden="true" />
        <span>{t('app.name')}</span>
      </NavLink>

      <nav className={styles.links} aria-label="Primary">
        <NavLink to="/" end className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
          {t('nav.home')}
        </NavLink>
        <NavLink to="/standings" className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
          {t('nav.standings')}
        </NavLink>
        <NavLink to="/collection" className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
          {t('nav.collection')}
        </NavLink>
      </nav>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.iconButton}
          onClick={toggleLang}
          aria-label="Toggle language"
          title="Toggle language"
        >
          <FaGlobeAmericas aria-hidden="true" />
          <span>{t('lang.toggle')}</span>
        </button>
        <button
          type="button"
          className={styles.iconButton}
          onClick={toggleTheme}
          aria-label={isDark ? t('theme.toggleToLight') : t('theme.toggleToDark')}
          title={isDark ? t('theme.toggleToLight') : t('theme.toggleToDark')}
        >
          {theme === 'dark' ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}
