'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Award, ExternalLink, Calendar, Percent } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { education, certifications } from '@/data/portfolio';

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="education"
      className="section-padding bg-[var(--color-bg-secondary)]"
      aria-label="Education and certifications"
    >
      <div className="container-inner" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading eyebrow="Education & Certifications" title="Academic background" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Education */}
          {education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
                  <GraduationCap size={24} className="text-[var(--color-primary)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[var(--color-text)] text-base leading-snug mb-1">
                    {edu.degree}
                  </h3>
                  <p className="text-sm font-medium text-[var(--color-primary)] mb-1">
                    {edu.institution}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)] mb-3">{edu.university}</p>
                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
                      <Calendar size={12} />
                      {edu.start} – {edu.end}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
                      <Percent size={12} />
                      {edu.percentage}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Certifications */}
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                  <Award size={24} className="text-amber-600 dark:text-amber-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[var(--color-text)] text-base leading-snug mb-1">
                    {cert.name}
                  </h3>
                  <p className="text-sm font-medium text-[var(--color-primary)] mb-1">
                    {cert.issuer}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)] mb-4">Issued {cert.year}</p>
                  <a
                    href={cert.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-primary)] hover:underline"
                  >
                    <ExternalLink size={12} />
                    Verify Certificate
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
