'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { education } from '@/data/education';
import styles from './Education.module.scss';

export default function Education() {
  const t = useTranslations('education');
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className={styles.education} id="education">
      <div className={styles.container} ref={ref}>
        <motion.span
          className="section-label"
          initial={{ opacity: 0, x: -20 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {t('heading')}
        </motion.span>
        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {t('subtitle')}
        </motion.h2>

        <div className={styles.grid}>
          {education.map((edu, i) => (
            <motion.div
              key={edu.id}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
            >
              <span className={styles.index}>0{i + 1}</span>
              <div className={styles.cardContent}>
                <span className={styles.period}>{edu.period}</span>
                <h3 className={styles.institution}>{edu.institution}</h3>
                <p className={styles.degree}>{edu.degree}</p>
                <p className={styles.desc}>{edu.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
