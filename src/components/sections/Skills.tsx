'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { skills, type Skill } from '@/data/skills';
import styles from './Skills.module.scss';

const categoryOrder = ['design', 'frontend', 'backend', 'tools'] as const;

export default function Skills() {
  const t = useTranslations('skills');
  const { ref, isVisible } = useScrollReveal();

  const grouped = categoryOrder.reduce(
    (acc, cat) => {
      acc[cat] = skills.filter((s) => s.category === cat);
      return acc;
    },
    {} as Record<string, Skill[]>
  );

  return (
    <section className={styles.skills} id="skills">
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
          {categoryOrder.map((cat, ci) => (
            <motion.div
              key={cat}
              className={styles.category}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + ci * 0.1 }}
            >
              <div className={styles.categoryHeader}>
                <span className={styles.categoryIndex}>0{ci + 1}</span>
                <h3 className={styles.categoryTitle}>{t(cat)}</h3>
              </div>

              <div className={styles.skillList}>
                {grouped[cat].map((skill, si) => (
                  <div key={skill.name} className={styles.skillItem}>
                    <div className={styles.skillInfo}>
                      <span className={styles.skillName}>{skill.name}</span>
                    </div>
                    <div className={styles.bar}>
                      <motion.div
                        className={styles.barFill}
                        initial={{ scaleX: 0 }}
                        animate={isVisible ? { scaleX: skill.level / 100 } : {}}
                        transition={{
                          duration: 1,
                          delay: 0.5 + ci * 0.15 + si * 0.08,
                          ease: [0.25, 0.1, 0.25, 1] as const,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
