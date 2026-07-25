'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { about, languages } from '@/data/portfolio';

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="about"
      className="section-padding bg-[var(--color-bg-secondary)]"
      aria-label="About me"
    >
      <div className="container-inner" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            eyebrow="About Me"
            title="A developer with a different backstory"
            subtitle="Six years in manufacturing, then a deliberate switch into software. Here's why that makes me different."
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-[var(--color-text-muted)] leading-relaxed text-base lg:text-lg">
              {about.summary}
            </p>

            <div className="mt-8 p-5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
              <p className="font-mono text-xs text-[var(--color-text-subtle)] mb-3 uppercase tracking-widest">
                <span className="text-[var(--color-accent)] opacity-70">{'✦ '}</span>
                currently_learning
              </p>
              <div className="flex flex-wrap gap-2">
                {about.currentlyLearning.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 font-mono text-xs rounded bg-[var(--color-primary)]/8 text-[var(--color-primary)] border border-[var(--color-primary)]/25"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 p-5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
              <p className="font-mono text-xs text-[var(--color-text-subtle)] mb-3 uppercase tracking-widest">
                <span className="text-[var(--color-accent)] opacity-70">{'✦ '}</span>
                languages
              </p>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <div key={lang.language} className="flex items-center justify-between">
                    <span className="font-mono text-xs font-medium text-[var(--color-text)]">
                      {lang.language}
                    </span>
                    <span className="font-mono text-[11px] text-[var(--color-text-subtle)]">
                      {lang.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-3"
          >
            <p className="text-sm font-semibold text-[var(--color-text)] mb-4 uppercase tracking-widest">
              Key Highlights
            </p>
            {about.highlights.map((highlight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.35 + i * 0.07 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 transition-colors"
              >
                <CheckCircle2 size={18} className="text-[var(--color-primary)] shrink-0 mt-0.5" />
                <p className="text-sm text-[var(--color-text-muted)] leading-snug">{highlight}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
