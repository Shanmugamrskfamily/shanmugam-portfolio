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
      className="section-padding bg-[var(--color-bg-secondary)] relative overflow-hidden"
      aria-label="Education and certifications"
    >
      <div
        className="blob w-72 h-72 -bottom-10 -left-10 opacity-10 dark:opacity-20 animate-blob-float-b"
        style={{ background: '#4ecdc4' }}
      />

      <div className="container-inner relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading eyebrow="Education & Certifications" title="Academic background" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Education entries */}
          {education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
              className="clay-card overflow-hidden"
            >
              <div
                className="h-[3px]"
                style={{ background: 'linear-gradient(90deg, #6c63ff, #4ecdc4)' }}
              />
              <div className="p-6 flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                  style={{
                    background: 'rgba(108,99,255,0.1)',
                    border: '1.5px solid rgba(108,99,255,0.2)',
                    boxShadow: '0 4px 0 rgba(108,99,255,0.15)',
                  }}
                >
                  <GraduationCap size={22} className="text-[var(--color-primary)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-black text-base text-[var(--color-text)] leading-snug mb-1">
                    {edu.degree}
                  </h3>
                  <p className="text-sm font-bold text-[var(--color-primary)] mb-1">
                    {edu.institution}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)] mb-3">{edu.university}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="clay-badge inline-flex items-center gap-1.5 px-2.5 py-1 text-xs">
                      <Calendar size={11} />
                      {edu.start} – {edu.end}
                    </span>
                    <span className="clay-badge inline-flex items-center gap-1.5 px-2.5 py-1 text-xs">
                      <Percent size={11} />
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
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
              className="clay-card overflow-hidden"
            >
              <div
                className="h-[3px]"
                style={{ background: 'linear-gradient(90deg, #ffd93d, #ff6b6b)' }}
              />
              <div className="p-6 flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                  style={{
                    background: 'rgba(255,217,61,0.12)',
                    border: '1.5px solid rgba(255,217,61,0.3)',
                    boxShadow: '0 4px 0 rgba(255,217,61,0.2)',
                  }}
                >
                  <Award size={22} className="text-amber-600 dark:text-amber-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-black text-base text-[var(--color-text)] leading-snug mb-1">
                    {cert.name}
                  </h3>
                  <p className="text-sm font-bold text-[var(--color-primary)] mb-1">
                    {cert.issuer}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)] mb-4">Issued {cert.year}</p>
                  <a
                    href={cert.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-primary)] hover:underline"
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
