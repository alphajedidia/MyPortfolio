'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './Contact.module.scss';

const contactLinks = [
  {
    icon: '✉️',
    label: 'alphajedidia01@gmail.com',
    href: 'mailto:alphajedidia01@gmail.com',
  },
  {
    icon: '💼',
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/alpha-jedidia',
  },
  {
    icon: '🐙',
    label: 'GitHub',
    href: 'https://github.com/alphajedidia',
  },
  {
    icon: '📞',
    label: '+261 38 24 303 17',
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
            className={styles.links}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={styles.link}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                <span className={styles.icon}>{link.icon}</span>
                {link.label}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p className={styles.footerText}>
            &copy; {new Date().getFullYear()} Alpha Jedidia R. {tFooter('rights')}
          </p>
          <p className={styles.footerText}>{tFooter('madeWith')}</p>
        </div>
      </footer>
    </>
  );
}
