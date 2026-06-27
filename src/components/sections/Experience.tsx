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
      className="section-padding bg-[var(--color-bg-secondary)]"
      aria-label="Work experience"
    >
      <div className="container-inner" ref={ref}>
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
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-[var(--color-border)] hidden sm:block" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={`${exp.company}-${i}`}
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative sm:pl-16"
              >
                {/* Timeline dot */}
                <div className="absolute left-4 top-6 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-[var(--color-primary)] bg-[var(--color-bg)] hidden sm:block z-10" />

                <div className="tron-card rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden hover:border-[var(--color-primary)]/50 transition-all duration-300">
                  {/* Header */}
                  <div className="p-5 sm:p-6 border-b border-[var(--color-border)]">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              exp.type === 'Full-time' ? 'bg-emerald-500' : 'bg-amber-500'
                            }`}
                          />
                          <span className="text-xs font-medium text-[var(--color-text-muted)]">
                            {exp.type}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-[var(--color-text)]">{exp.role}</h3>
                        <p className="text-base font-semibold text-[var(--color-primary)]">
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

                    {exp.lead_developer && (
                      <div className="mt-3 flex items-start gap-2 flex-wrap">
                        <Star size={13} className="text-[var(--color-primary)] shrink-0 mt-0.5" />
                        <span className="text-xs text-[var(--color-text-muted)]">
                          <span className="font-mono text-[var(--color-primary)] mr-1">
                            Lead Developer:
                          </span>
                          <span className="font-medium text-[var(--color-text)]">
                            {exp.lead_developer.join(' · ')}
                          </span>
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
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] shrink-0" />
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
                            className="tron-badge px-2 py-0.5 font-mono text-[11px] rounded"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    {exp.tech.length === 0 && (
                      <div className="flex items-center gap-2 text-xs text-[var(--color-text-subtle)]">
                        <Briefcase size={13} />
                        <span>Operations &amp; Manufacturing leadership role</span>
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
