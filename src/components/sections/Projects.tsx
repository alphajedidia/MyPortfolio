'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { projects, categories, type ProjectCategory } from '@/data/projects';
import styles from './Projects.module.scss';

export default function Projects() {
  const t = useTranslations('projects');
  const { ref: headerRef, isVisible } = useScrollReveal();
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | 'all'>('all');

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  // Horizontal scroll: translate X based on scroll progress
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `-${Math.max(0, (filtered.length + 1) * 25 - 100)}%`]
  );

  return (
    <section className={styles.projects} id="projects" ref={sectionRef}>
      <div className={styles.sticky}>
        <div className={styles.header} ref={headerRef}>
          <div className={styles.headerLeft}>
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
          </div>

          <motion.div
            className={styles.filters}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
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
        </div>

        <div className={styles.trackWrapper}>
          <motion.div className={styles.track} style={{ x }}>
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.article
                  key={project.id}
                  className={styles.card}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  data-cursor="View"
                >
                  <div className={styles.cardImage}>
                    <div className={styles.cardImageInner}>
                      <span className={styles.cardIndex}>
                        {String(i + 1).padStart(2, '0')}
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
                    <h3 className={styles.cardTitle}>{project.title}</h3>
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

            {/* View More end card */}
            <div className={styles.endCard} data-cursor="Scroll">
              <span className={styles.endIndex}>{String(filtered.length + 1).padStart(2, '0')}</span>
              <p className={styles.endText}>Keep scrolling to explore more</p>
              <svg className={styles.endArrow} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Progress bar */}
        <div className={styles.progressWrap}>
          <div className={styles.progressTrack}>
            <motion.div className={styles.progressFill} style={{ scaleX: scrollYProgress }} />
          </div>
          <span className={styles.progressLabel}>
            {filtered.length} projects
          </span>
        </div>
      </div>
    </section>
  );
}
