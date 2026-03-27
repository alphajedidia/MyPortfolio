'use client';

import { motion } from 'framer-motion';
import styles from './Marquee.module.scss';

interface MarqueeProps {
  items: string[];
  speed?: number;
  separator?: string;
}

export default function Marquee({ items, speed = 30, separator = '—' }: MarqueeProps) {
  const text = items.join(` ${separator} `) + ` ${separator} `;

  return (
    <div className={styles.marquee}>
      <motion.div
        className={styles.track}
        animate={{ x: [0, '-50%'] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear',
          },
        }}
      >
        <span className={styles.text}>{text}</span>
        <span className={styles.text}>{text}</span>
      </motion.div>
    </div>
  );
}
