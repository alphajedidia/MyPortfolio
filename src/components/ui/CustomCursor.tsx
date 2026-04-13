'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styles from './CustomCursor.module.scss';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 35, stiffness: 500, mass: 0.3 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);
  const mounted = useRef(false);

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 1024px)').matches);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    mounted.current = true;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-cursor]')) {
        setIsHovering(true);
      }
    };

    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-cursor]')) {
        setIsHovering(false);
      }
    };

    const handleLeave = () => setIsHidden(true);
    const handleEnter = () => setIsHidden(false);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
    };
  }, [cursorX, cursorY, isMobile]);

  if (isMobile) return null;

  return (
    <motion.div
      className={`${styles.cursor} ${isHovering ? styles.hovering : ''} ${isHidden ? styles.hidden : ''}`}
      style={{ x, y }}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={styles.arrow}
      >
        <path d="M5.5 2l14 10.5-6.5 1.5-3.5 6z" />
      </svg>
    </motion.div>
  );
}
