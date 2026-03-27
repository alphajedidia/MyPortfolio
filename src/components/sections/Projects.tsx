'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { projects, categories, type ProjectCategory } from '@/data/projects';
import styles from './Projects.module.scss';

const categoryIcons: Record<ProjectCategory, string> = {
  web: '01',
  mobile: '02',
  desktop: '03',
  design: '04',
  ai: '05',
  other: '06',
};

export default function Projects() {
  const t = useTranslations('projects');
  const { ref, isVisible } = useScrollReveal();
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | 'all'>('all');

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section className={styles.projects} id="projects">
      <div className={styles.container} ref={ref}>
        <div className={styles.header}>
          <div>
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
              Selected work
            </motion.h2>
            <motion.p
              className="section-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('subtitle')}
            </motion.p>
          </div>
        </div>

        <motion.div
          className={styles.filters}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              className={`${styles.filterBtn} ${activeFilter === cat.key ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveFilter(cat.key)}
            >
              {t(cat.key)}
            </button>
          ))}
        </motion.div>

        <div className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.article
                key={project.id}
                className={`${styles.card} ${project.featured ? styles.featured : ''}`}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
                data-cursor="View"
              >
                <div className={styles.cardImage}>
                  <div className={styles.cardImageInner}>
                    <span className={styles.cardCategory}>
                      {categoryIcons[project.category]}
                    </span>
                    <span className={styles.cardCategoryLabel}>
                      {t(project.category)}
                    </span>
                  </div>
                  <div className={styles.cardOverlay}>
                    {project.liveUrl && (
                      <a href={project.liveUrl} className={styles.cardLink} target="_blank" rel="noopener noreferrer">
                        {t('viewProject')}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} className={styles.cardLink} target="_blank" rel="noopener noreferrer">
                        {t('viewCode')}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.cardMeta}>
                    <h3 className={styles.cardTitle}>{project.title}</h3>
                  </div>
                  <p className={styles.cardDesc}>{project.description}</p>
                  <div className={styles.cardTags}>
                    {project.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
