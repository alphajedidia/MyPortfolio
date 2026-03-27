'use client';

import { useState, useTransition } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useTheme } from '@/context/ThemeContext';
import { setLocale } from '@/app/actions';
import { useRouter } from 'next/navigation';
import styles from './Navbar.module.scss';

const navLinks = ['about', 'projects', 'experience', 'skills', 'education', 'contact'] as const;
const locales = ['en', 'fr', 'de'] as const;

export default function Navbar() {
  const t = useTranslations('nav');
  const { theme, toggleTheme } = useTheme();
  const locale = useLocale();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [, startTransition] = useTransition();

  const handleLocale = (newLocale: string) => {
    startTransition(async () => {
      await setLocale(newLocale);
      router.refresh();
    });
  };

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <a href="#" className={styles.logo}>
          Alpha<span>.</span>
        </a>

        <div className={styles.links}>
          {navLinks.map((link) => (
            <button key={link} className={styles.link} onClick={() => scrollTo(link)}>
              {t(link)}
            </button>
          ))}
        </div>

        <div className={styles.controls}>
          <div className={styles.langSwitcher}>
            {locales.map((l) => (
              <button
                key={l}
                className={`${styles.langBtn} ${locale === l ? styles.langBtnActive : ''}`}
                onClick={() => handleLocale(l)}
              >
                {l}
              </button>
            ))}
          </div>

          <button className={styles.themeToggle} onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          <button
            className={`${styles.menuBtn} ${mobileOpen ? styles.menuBtnOpen : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ''}`}>
        {navLinks.map((link) => (
          <button key={link} className={styles.mobileLink} onClick={() => scrollTo(link)}>
            {t(link)}
          </button>
        ))}
      </div>
    </nav>
  );
}
