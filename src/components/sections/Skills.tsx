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
          {categoryOrder.map((cat, ci) => (
            <motion.div
              key={cat}
              className={styles.category}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + ci * 0.1 }}
            >
              <h3>{t(cat)}</h3>
              <div className={styles.skillList}>
                {grouped[cat].map((skill, si) => (
                  <div key={skill.name} className={styles.skillItem}>
                    <div className={styles.skillHeader}>
                      <span className={styles.skillName}>{skill.name}</span>
                      <span className={styles.skillLevel}>{skill.level}%</span>
                    </div>
                    <div className={styles.bar}>
                      <motion.div
                        className={styles.barFill}
                        initial={{ scaleX: 0 }}
                        animate={isVisible ? { scaleX: skill.level / 100 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 + ci * 0.1 + si * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
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
