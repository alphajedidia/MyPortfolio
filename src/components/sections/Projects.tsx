'use client';

import { useRef, useState, useMemo, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { projects, categories, type ProjectCategory } from '@/data/projects';
import styles from './Projects.module.scss';

const PAGE_SIZE = 5;

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

  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  // Measure how far the track needs to scroll
  useEffect(() => {
    const measure = () => {
      if (trackRef.current && wrapperRef.current) {
        const trackW = trackRef.current.scrollWidth;
        const viewW = wrapperRef.current.offsetWidth;
        setScrollRange(Math.max(0, trackW - viewW));
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [visible.length, hasMore]);

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  // Section height: just enough to scroll all cards into view
  // ~100vh base + 50vh per card that needs to scroll in
  const totalCards = visible.length + (hasMore ? 1 : 0);
  const extraCards = Math.max(0, totalCards - 2); // first ~2 cards visible without scrolling
  const sectionHeight = `${100 + extraCards * 40}vh`;

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  const handleFilterChange = (key: ProjectCategory | 'all') => {
    setActiveFilter(key);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <section
      className={styles.projects}
      id="projects"
      ref={sectionRef}
      style={{ height: sectionHeight }}
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

        <div className={styles.trackWrapper} ref={wrapperRef}>
          <motion.div className={styles.track} style={{ x }} ref={trackRef}>
            <AnimatePresence mode="popLayout">
              {visible.map((project, i) => (
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

            {/* Show More end card */}
            {hasMore && (
              <motion.div
                className={styles.endCard}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
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
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Progress bar */}
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
