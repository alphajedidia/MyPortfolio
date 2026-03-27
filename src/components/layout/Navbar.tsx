'use client';

import { useState, useTransition, useRef, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { setLocale } from '@/app/actions';
import { useRouter } from 'next/navigation';
import styles from './Navbar.module.scss';

const navLinks = ['about', 'projects', 'experience', 'skills', 'education', 'contact'] as const;
const locales = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
] as const;

const textVariants = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
};

export default function Navbar() {
  const t = useTranslations('nav');
  const { theme, toggleTheme } = useTheme();
  const locale = useLocale();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [, startTransition] = useTransition();
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLocale = (newLocale: string) => {
    setLangOpen(false);
    startTransition(async () => {
      await setLocale(newLocale);
      router.refresh();
    });
  };

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const currentLang = locales.find((l) => l.code === locale);

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <a href="#" className={styles.logo}>
          A<span>.</span>
        </a>

        <div className={styles.links}>
          {navLinks.map((link) => (
            <button key={link} className={styles.link} onClick={() => scrollTo(link)}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={`${link}-${locale}`}
                  variants={textVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  {t(link)}
                </motion.span>
              </AnimatePresence>
            </button>
          ))}
        </div>

        <div className={styles.controls}>
          <div className={styles.langDropdown} ref={langRef}>
            <button
              className={styles.langTrigger}
              onClick={() => setLangOpen(!langOpen)}
              aria-expanded={langOpen}
            >
              <span className={styles.langCode}>{locale.toUpperCase()}</span>
              <svg
                className={`${styles.chevron} ${langOpen ? styles.chevronOpen : ''}`}
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  className={styles.langMenu}
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  {locales.map((l) => (
                    <button
                      key={l.code}
                      className={`${styles.langOption} ${locale === l.code ? styles.langOptionActive : ''}`}
                      onClick={() => handleLocale(l.code)}
                    >
                      <span className={styles.langOptionCode}>{l.code.toUpperCase()}</span>
                      <span className={styles.langOptionLabel}>{l.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button className={styles.themeToggle} onClick={toggleTheme} aria-label="Toggle theme">
            <AnimatePresence mode="wait">
              <motion.span
                key={theme}
                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                transition={{ duration: 0.25 }}
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </motion.span>
            </AnimatePresence>
          </button>

          <button
            className={`${styles.menuBtn} ${mobileOpen ? styles.menuBtnOpen : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link}
                className={styles.mobileLink}
                onClick={() => scrollTo(link)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
              >
                {t(link)}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
