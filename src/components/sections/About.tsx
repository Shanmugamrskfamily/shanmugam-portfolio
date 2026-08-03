'use client';

import { motion, useInView } from 'framer-motion';
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
      className="section-padding bg-[var(--color-bg-secondary)] relative overflow-hidden"
      aria-label="About me"
    >
      {/* Subtle bg blob */}
      <div
        className="blob w-80 h-80 top-0 right-0 opacity-10 dark:opacity-20 animate-blob-float-b"
        style={{ background: '#4ecdc4' }}
      />

      <div className="container-inner relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            eyebrow="About Me"
            title="A developer with a different backstory"
            subtitle="Six years in manufacturing, then a deliberate switch into software."
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left: Summary + panels */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p className="text-[var(--color-text-muted)] leading-relaxed text-base lg:text-lg mb-6">
              {about.summary}
            </p>

            {/* Currently learning */}
            <div className="clay-card-sm p-5 mb-4">
              <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-text-subtle)] mb-3 font-bold">
                Currently Learning
              </p>
              <div className="flex flex-wrap gap-2">
                {about.currentlyLearning.map((item) => (
                  <span
                    key={item}
                    className="clay-badge px-3 py-1 font-mono text-xs font-semibold text-[var(--color-primary)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="clay-card-sm p-5">
              <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-text-subtle)] mb-3 font-bold">
                Languages
              </p>
              <div className="space-y-2.5">
                {languages.map((lang) => (
                  <div key={lang.language} className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-[var(--color-text)]">
                      {lang.language}
                    </span>
                    <span className="clay-badge px-2.5 py-0.5 font-mono text-[11px]">
                      {lang.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Key highlights */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="space-y-3"
          >
            <p className="font-display font-bold text-sm text-[var(--color-text)] uppercase tracking-widest mb-4">
              Key Highlights
            </p>
            {about.highlights.map((highlight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                className="clay-card-sm flex items-start gap-3 p-4 hover:cursor-default"
              >
                <CheckCircle2 size={17} className="text-[var(--color-primary)] shrink-0 mt-0.5" />
                <p className="text-sm text-[var(--color-text-muted)] leading-snug">{highlight}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
