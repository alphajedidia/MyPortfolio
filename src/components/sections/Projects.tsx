'use client';

import { useRef, useState, useMemo, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { projects, categories, type ProjectCategory } from '@/data/projects';
import styles from './Projects.module.scss';

const PAGE_SIZE = 5;
const CARD_WIDTH = 440; // px, matches CSS
const CARD_GAP = 32;   // matches $space-2xl
const END_CARD_WIDTH = 260;

export default function Projects() {
  const t = useTranslations('projects');
  const { ref: headerRef, isVisible } = useScrollReveal();
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | 'all'>('all');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const filtered = useMemo(
    () => activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter),
    [activeFilter]
  );

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const totalCards = visible.length + (hasMore ? 1 : 0);

  // Calculate scroll range from card count (no DOM measurement needed)
  const totalTrackWidth =
    visible.length * CARD_WIDTH +
    (hasMore ? END_CARD_WIDTH : 0) +
    (totalCards - 1) * CARD_GAP +
    80; // padding

  const [viewportWidth, setViewportWidth] = useState(1200);

  useEffect(() => {
    setViewportWidth(window.innerWidth);
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const scrollRange = Math.max(0, totalTrackWidth - viewportWidth);
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  // Section height proportional to how far we need to scroll
  const sectionHeight = Math.max(200, 120 + (scrollRange / viewportWidth) * 100);

  const handleShowMore = useCallback(() => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  }, []);

  const handleFilterChange = useCallback((key: ProjectCategory | 'all') => {
    setActiveFilter(key);
    setVisibleCount(PAGE_SIZE);
  }, []);

  return (
    <section
      className={styles.projects}
      id="projects"
      ref={sectionRef}
      style={{ height: `${sectionHeight}vh` }}
    >
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
                onClick={() => handleFilterChange(cat.key)}
              >
                {t(cat.key)}
              </button>
            ))}
          </motion.div>
        </div>

        <div className={styles.trackWrapper}>
          <motion.div className={styles.track} style={{ x }}>
            {visible.map((project, i) => (
              <article
                key={project.id}
                className={styles.card}
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
              </article>
            ))}

            {hasMore && (
              <div className={styles.endCard}>
                <span className={styles.endCount}>
                  +{filtered.length - visibleCount}
                </span>
                <p className={styles.endText}>
                  more {activeFilter === 'all' ? 'projects' : activeFilter} to explore
                </p>
                <button className={styles.showMoreBtn} onClick={handleShowMore} data-cursor="Load">
                  <span>Show more</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
              </div>
            )}
          </motion.div>
        </div>

        <div className={styles.progressWrap}>
          <div className={styles.progressTrack}>
            <motion.div className={styles.progressFill} style={{ scaleX: scrollYProgress }} />
          </div>
          <span className={styles.progressLabel}>
            {visible.length} / {filtered.length}
          </span>
        </div>
      </div>
    </section>
  );
}
