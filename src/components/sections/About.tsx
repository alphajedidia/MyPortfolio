'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './About.module.scss';

export default function About() {
  const t = useTranslations('about');
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className={styles.about} id="about">
      <div className={styles.container} ref={ref}>
        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {t('heading')}
        </motion.h2>
        <div className={styles.content}>
          {(['p1', 'p2', 'p3'] as const).map((key, i) => (
            <motion.p
              key={key}
              className={styles.text}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            >
              {t(key)}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
