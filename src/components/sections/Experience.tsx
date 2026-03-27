'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { experiences } from '@/data/experience';
import styles from './Experience.module.scss';

export default function Experience() {
  const t = useTranslations('experience');
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className={styles.experience} id="experience">
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

        <div className={styles.timeline}>
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              className={styles.item}
              initial={{ opacity: 0, x: -20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
            >
              <h3 className={styles.role}>{exp.role}</h3>
              <div className={styles.meta}>
                <span className={styles.company}>{exp.company}</span>
                <span className={styles.period}>{exp.period}</span>
              </div>
              <p className={styles.desc}>{exp.description}</p>
              <div className={styles.tags}>
                {exp.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
