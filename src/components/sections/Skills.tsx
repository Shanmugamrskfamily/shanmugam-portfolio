'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import { skillGroups } from '@/data/portfolio';

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="section-padding" aria-label="Skills">
      <div className="container-inner" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            eyebrow="Technical Skills"
            title="My tech stack"
            subtitle="Technologies I've used in production, grouped by category."
          />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group p-5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/50 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-primary)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-center gap-2.5 mb-4">
                <span
                  className="text-base w-7 h-7 flex items-center justify-center rounded-md bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20"
                  role="img"
                  aria-label={group.label}
                >
                  {group.icon}
                </span>
                <h3 className="font-mono text-xs font-semibold text-[var(--color-text)] uppercase tracking-widest">
                  {group.label}
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 font-mono text-[11px] rounded bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-muted)] group-hover:border-[var(--color-primary)]/25 group-hover:text-[var(--color-text)] transition-all duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
