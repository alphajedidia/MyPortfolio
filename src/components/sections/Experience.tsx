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

        <div className={styles.timeline}>
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              className={styles.item}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className={styles.itemLeft}>
                <span className={styles.period}>{exp.period}</span>
                <span className={styles.index}>0{i + 1}</span>
              </div>
              <div className={styles.itemRight}>
                <h3 className={styles.role}>{exp.role}</h3>
                <span className={styles.company}>{exp.company}</span>
                <p className={styles.desc}>{exp.description}</p>
                <div className={styles.tags}>
                  {exp.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
