'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Marquee from '@/components/ui/Marquee';
import styles from './About.module.scss';

const stats = [
  { number: '35+', label: 'Projects' },
  { number: '3+', label: 'Years Experience' },
  { number: '10+', label: 'Technologies' },
];

const marqueeItems = [
  'User-Centered Design',
  'Design Thinking',
  'Figma',
  'React',
  'Next.js',
  'TypeScript',
  'Kotlin',
  'Java',
  'PHP',
  'Django',
  'Prototyping',
  'Wireframing',
];

export default function About() {
  const t = useTranslations('about');
  const { ref, isVisible } = useScrollReveal();

  return (
    <>
      <Marquee items={marqueeItems} speed={35} separator="\u00B7" />
      <section className={styles.about} id="about">
        <div className={styles.container} ref={ref}>
          <div className={styles.grid}>
            <div className={styles.left}>
              <motion.span
                className="section-label"
                initial={{ opacity: 0, x: -20 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                {t('heading')}
              </motion.span>
              <motion.h2
                className={styles.heading}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                Crafting digital
                <br />
                experiences that
                <br />
                <span className={styles.italic}>matter</span>
              </motion.h2>
            </div>

            <div className={styles.right}>
              {(['p1', 'p2', 'p3'] as const).map((key, i) => (
                <motion.p
                  key={key}
                  className={styles.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
                >
                  {t(key)}
                </motion.p>
              ))}
            </div>
          </div>

          <motion.div
            className={styles.stats}
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            {stats.map((stat, i) => (
              <div key={stat.label} className={styles.stat}>
                <span className={styles.statNumber}>{stat.number}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
