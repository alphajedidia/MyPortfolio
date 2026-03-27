'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import MagneticButton from '@/components/ui/MagneticButton';
import styles from './Hero.module.scss';

const lineReveal = {
  hidden: { y: '100%' },
  visible: (i: number) => ({
    y: 0,
    transition: {
      delay: 2.2 + i * 0.12,
      duration: 0.9,
      ease: [0.76, 0, 0.24, 1] as const,
    },
  }),
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 2.8 + i * 0.1,
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.labelWrap}>
            <motion.span
              className={styles.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.6, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {t('greeting')}
            </motion.span>
          </div>

          <h1 className={styles.name}>
            <span className={styles.line}>
              <motion.span variants={lineReveal} initial="hidden" animate="visible" custom={0}>
                Alpha
              </motion.span>
            </span>
            <span className={styles.line}>
              <motion.span variants={lineReveal} initial="hidden" animate="visible" custom={1}>
                Jedidia<span className={styles.accent}>.</span>
              </motion.span>
            </span>
          </h1>

          <motion.div
            className={styles.titleWrap}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <p className={styles.title}>{t('title')}</p>
          </motion.div>

          <motion.p
            className={styles.subtitle}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            {t('subtitle')}
          </motion.p>

          <motion.div
            className={styles.actions}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            <MagneticButton>
              <button
                className={styles.cta}
                data-cursor="View"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span>{t('cta')}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </button>
            </MagneticButton>
            <MagneticButton>
              <a href="/cv.pdf" download className={styles.secondary} data-cursor="Download">
                {t('resume')}
              </a>
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          className={styles.scrollHint}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 0.8 }}
        >
          <span className={styles.scrollText}>Scroll</span>
          <motion.span
            className={styles.scrollLine}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>

      <motion.div
        className={styles.bgNumber}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
      >
        2026
      </motion.div>
    </section>
  );
}
