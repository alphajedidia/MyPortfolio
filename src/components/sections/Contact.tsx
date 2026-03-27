'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import MagneticButton from '@/components/ui/MagneticButton';
import styles from './Contact.module.scss';

const contactLinks = [
  {
    label: 'Email',
    value: 'alphajedidia01@gmail.com',
    href: 'mailto:alphajedidia01@gmail.com',
  },
  {
    label: 'LinkedIn',
    value: 'alpha-jedidia',
    href: 'https://linkedin.com/in/alpha-jedidia',
  },
  {
    label: 'GitHub',
    value: 'alphajedidia',
    href: 'https://github.com/alphajedidia',
  },
  {
    label: 'Phone',
    value: '+261 38 24 303 17',
    href: 'tel:+261382430317',
  },
];

export default function Contact() {
  const t = useTranslations('contact');
  const tFooter = useTranslations('footer');
  const { ref, isVisible } = useScrollReveal();

  return (
    <>
      <section className={styles.contact} id="contact">
        <div className={styles.container} ref={ref}>
          <div className={styles.top}>
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
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Let&apos;s work
              <br />
              <span className={styles.italic}>together</span>
            </motion.h2>
          </div>

          <motion.div
            className={styles.links}
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {contactLinks.map((link) => (
              <MagneticButton key={link.label} strength={0.15}>
                <a
                  href={link.href}
                  className={styles.link}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  data-cursor="Open"
                >
                  <span className={styles.linkLabel}>{link.label}</span>
                  <span className={styles.linkValue}>{link.value}</span>
                  <svg className={styles.linkArrow} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </MagneticButton>
            ))}
          </motion.div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p className={styles.footerText}>
            &copy; {new Date().getFullYear()} Alpha Jedidia R.
          </p>
          <p className={styles.footerText}>{tFooter('madeWith')}</p>
          <p className={styles.footerText}>
            {tFooter('rights')}
          </p>
        </div>
      </footer>
    </>
  );
}
