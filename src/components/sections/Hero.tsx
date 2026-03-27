'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import styles from './Hero.module.scss';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.container}>
        <motion.p className={styles.greeting} variants={fadeUp} initial="hidden" animate="visible" custom={0}>
          {t('greeting')}
        </motion.p>
        <motion.h1 className={styles.name} variants={fadeUp} initial="hidden" animate="visible" custom={1}>
          {t('name')}
        </motion.h1>
        <motion.p className={styles.title} variants={fadeUp} initial="hidden" animate="visible" custom={2}>
          {t('title')}
        </motion.p>
        <motion.p className={styles.subtitle} variants={fadeUp} initial="hidden" animate="visible" custom={3}>
          {t('subtitle')}
        </motion.p>
        <motion.div className={styles.actions} variants={fadeUp} initial="hidden" animate="visible" custom={4}>
          <button className={styles.cta} onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
            {t('cta')}
          </button>
          <a href="/cv.pdf" download className={styles.secondary}>
            {t('resume')}
          </a>
        </motion.div>
      </div>
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className={styles.line} />
      </motion.div>
    </section>
  );
}
