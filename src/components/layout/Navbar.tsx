'use client';

import { useState, useTransition, useRef, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { setLocale } from '@/app/actions';
import { useRouter } from 'next/navigation';
import styles from './Navbar.module.scss';

const navLinks = ['about', 'projects', 'experience', 'skills', 'contact'] as const;
const locales = [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'de', label: 'DE' },
] as const;

export default function Navbar() {
  const t = useTranslations('nav');
  const { theme, toggleTheme } = useTheme();
  const locale = useLocale();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [, startTransition] = useTransition();
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  return (
    <motion.nav
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 2 }}
    >
      <div className={styles.inner}>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={styles.logo}>
          <span className={styles.logoText}>A</span>
          <span className={styles.logoDot}>.</span>
        </button>

        <div className={styles.links}>
          {navLinks.map((link, i) => (
            <button key={link} className={styles.link} onClick={() => scrollTo(link)}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={`${link}-${locale}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: 'easeOut', delay: i * 0.03 }}
                >
                  {t(link)}
                </motion.span>
              </AnimatePresence>
            </button>
          ))}
        </div>

        <div className={styles.controls}>
          <div className={styles.langDropdown} ref={langRef}>
            <button className={styles.langTrigger} onClick={() => setLangOpen(!langOpen)}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={locale}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className={styles.langCode}
                >
                  {locale.toUpperCase()}
                </motion.span>
              </AnimatePresence>
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  className={styles.langMenu}
                  initial={{ opacity: 0, y: -4, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                >
                  {locales.map((l) => (
                    <button
                      key={l.code}
                      className={`${styles.langOption} ${locale === l.code ? styles.langOptionActive : ''}`}
                      onClick={() => handleLocale(l.code)}
                    >
                      {l.label}
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
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0, rotate: 180 }}
                transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
              >
                {theme === 'light' ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                )}
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
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link}
                className={styles.mobileLink}
                onClick={() => scrollTo(link)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              >
                <span className={styles.mobileLinkIndex}>0{i + 1}</span>
                {t(link)}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
