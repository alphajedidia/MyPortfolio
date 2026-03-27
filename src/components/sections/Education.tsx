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
        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {t('heading')}
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t('subtitle')}
        </motion.p>

        <div className={styles.grid}>
          {education.map((edu, i) => (
            <motion.div
              key={edu.id}
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            >
              <p className={styles.period}>{edu.period}</p>
              <h3 className={styles.institution}>{edu.institution}</h3>
              <p className={styles.degree}>{edu.degree}</p>
              <p className={styles.desc}>{edu.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
