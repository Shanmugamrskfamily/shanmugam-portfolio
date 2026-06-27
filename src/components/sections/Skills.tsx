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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/40 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl" role="img" aria-label={group.label}>
                  {group.icon}
                </span>
                <h3 className="text-sm font-semibold text-[var(--color-text)] uppercase tracking-wide">
                  {group.label}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-xs font-medium rounded-md bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-muted)] group-hover:border-[var(--color-primary)]/20 transition-colors"
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
