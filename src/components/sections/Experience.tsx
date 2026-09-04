'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, MapPin, Calendar, Star } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { experiences } from '@/data/portfolio';

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="experience"
      className="section-padding bg-[var(--color-bg-secondary)] relative overflow-hidden"
      aria-label="Work experience"
    >
      <div
        className="blob w-96 h-96 -top-20 -right-20 opacity-10 dark:opacity-20"
        style={{ background: '#ff6b6b' }}
      />

      <div className="container-inner relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            eyebrow="Work Experience"
            title="Where I've worked"
            subtitle="From manufacturing leadership to frontend engineering — every role shaped how I approach problems."
          />
        </motion.div>

        <div className="relative">
          {/* Animated timeline line */}
          <motion.div
            className="absolute left-6 top-0 w-[3px] rounded-full hidden sm:block"
            style={{
              background: 'linear-gradient(to bottom, #6c63ff, #ff6b6b, #ffd93d)',
              transformOrigin: 'top',
              height: '100%',
            }}
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.6, ease: 'easeOut', delay: 0.3 }}
          />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={`${exp.company}-${i}`}
                initial={{ opacity: 0, x: -28 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.34, 1.56, 0.64, 1] }}
                className="relative sm:pl-16"
              >
                {/* Timeline dot */}
                <div className="absolute left-4 top-7 -translate-x-1/2 hidden sm:block z-10">
                  <div
                    className="w-4 h-4 rounded-full border-[3px] border-[var(--color-primary)] bg-[var(--color-bg)]"
                    style={{ boxShadow: '0 0 0 4px rgba(108,99,255,0.15)' }}
                  />
                  {i === 0 && <div className="absolute inset-0 rounded-full animate-pulse-ring" />}
                </div>

                <div className="clay-card overflow-hidden">
                  {/* Gradient header stripe */}
                  <div
                    className="h-[3px]"
                    style={{
                      background:
                        i === 0
                          ? 'linear-gradient(90deg, #6c63ff, #ff6b6b)'
                          : i === 1
                            ? 'linear-gradient(90deg, #ff6b6b, #ffd93d)'
                            : 'linear-gradient(90deg, #4ecdc4, #6c63ff)',
                    }}
                  />

                  {/* Header */}
                  <div className="p-5 sm:p-6 border-b border-[var(--color-border)]">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span
                            className={`w-2.5 h-2.5 rounded-full ${
                              exp.type === 'Full-time'
                                ? 'bg-emerald-500'
                                : exp.type === 'Freelance'
                                  ? 'bg-violet-500'
                                  : 'bg-amber-500'
                            }`}
                            style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}
                          />
                          <span className="text-xs font-semibold text-[var(--color-text-muted)]">
                            {exp.type}
                          </span>
                        </div>
                        <h3 className="text-lg font-display font-black text-[var(--color-text)]">
                          {exp.role}
                        </h3>
                        <p className="text-base font-bold text-[var(--color-primary)]">
                          {exp.company}
                        </p>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="flex items-center justify-end gap-1.5 text-xs text-[var(--color-text-muted)]">
                          <Calendar size={12} />
                          <span>
                            {exp.start} — {exp.end}
                          </span>
                        </div>
                        <div className="flex items-center justify-end gap-1.5 text-xs text-[var(--color-text-subtle)]">
                          <MapPin size={12} />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    {exp.products_owned && (
                      <div className="mt-3 flex items-start gap-2 flex-wrap p-3 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border)]">
                        <Star size={13} className="text-[var(--color-accent)] shrink-0 mt-0.5" />
                        <span className="text-xs text-[var(--color-text-muted)]">
                          <span className="font-bold text-[var(--color-text)] mr-1">
                            Products Owned:
                          </span>
                          {exp.products_owned.join(' · ')}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-5 sm:p-6">
                    {exp.responsibilities.length > 0 && (
                      <ul className="space-y-2.5 mb-5">
                        {exp.responsibilities.map((r, j) => (
                          <li key={j} className="flex items-start gap-2.5">
                            <span
                              className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                              style={{
                                background: 'var(--gradient-primary)',
                                backgroundImage: 'linear-gradient(135deg, #6c63ff, #4ecdc4)',
                              }}
                            />
                            <span className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                              {r}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {exp.tech.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--color-border)]">
                        {exp.tech.map((t) => (
                          <span
                            key={t}
                            className="clay-badge px-2.5 py-1 font-mono text-[11px] font-medium"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    {exp.tech.length === 0 && (
                      <div className="flex items-center gap-2 text-xs text-[var(--color-text-subtle)]">
                        <Briefcase size={13} />
                        Operations &amp; Manufacturing leadership role
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
