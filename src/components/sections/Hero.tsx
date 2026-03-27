'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import MagneticButton from '@/components/ui/MagneticButton';
import ParticleField from '@/components/ui/ParticleField';
import styles from './Hero.module.scss';

const lineReveal = {
  hidden: { y: '110%' },
  visible: (i: number) => ({
    y: '0%',
    transition: {
      delay: 2.2 + i * 0.12,
      duration: 0.9,
      ease: [0.76, 0, 0.24, 1] as const,
    },
  }),
};

const fadeIn = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 2.7 + i * 0.1,
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

const stats = [
  { number: '35+', label: 'Projects' },
  { number: '3+', label: 'Years Exp.' },
  { number: '10+', label: 'Technologies' },
];

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className={styles.hero} id="hero">
      <ParticleField />
      <div className={styles.container}>
        <div className={styles.left}>
          <motion.span
            className={styles.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.6 }}
          >
            {t('greeting')}
          </motion.span>

          <h1 className={styles.name}>
            <span className={styles.line}>
              <motion.span variants={lineReveal} initial="hidden" animate="visible" custom={0}>
                Alpha Jedidia
              </motion.span>
            </span>
            <span className={styles.line}>
              <motion.span variants={lineReveal} initial="hidden" animate="visible" custom={1}>
                R<span className={styles.accent}>.</span>
              </motion.span>
            </span>
          </h1>

          <motion.p className={styles.title} variants={fadeIn} initial="hidden" animate="visible" custom={0}>
            {t('title')}
          </motion.p>

          <motion.p className={styles.subtitle} variants={fadeIn} initial="hidden" animate="visible" custom={1}>
            {t('subtitle')}
          </motion.p>

          <motion.div className={styles.actions} variants={fadeIn} initial="hidden" animate="visible" custom={2}>
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

        <div className={styles.right}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className={styles.stat}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 2.8 + i * 0.15,
                duration: 0.7,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <span className={styles.statNumber}>{stat.number}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        className={styles.scrollHint}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 0.8 }}
      >
        <motion.span
          className={styles.scrollLine}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
