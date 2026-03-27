'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { projects, categories, type ProjectCategory } from '@/data/projects';
import styles from './Projects.module.scss';

const categoryIcons: Record<ProjectCategory, string> = {
  web: '🌐',
  mobile: '📱',
  desktop: '🖥️',
  design: '🎨',
  ai: '🤖',
  other: '⚙️',
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

        <motion.div
          className={styles.filters}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
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
              <motion.div
                key={project.id}
                className={`${styles.card} ${project.featured ? styles.featured : ''}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <div className={styles.image}>
                  <div className={styles.imagePlaceholder}>
                    {categoryIcons[project.category]}
                  </div>
                  <div className={styles.imageOverlay}>
                    {project.liveUrl && (
                      <a href={project.liveUrl} className={styles.overlayLink} target="_blank" rel="noopener noreferrer">
                        {t('viewProject')}
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} className={styles.overlayLink} target="_blank" rel="noopener noreferrer">
                        {t('viewCode')}
                      </a>
                    )}
                  </div>
                </div>
                <div className={styles.body}>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <p className={styles.cardDesc}>{project.description}</p>
                  <div className={styles.tags}>
                    {project.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
