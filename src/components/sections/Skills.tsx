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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group sw-card p-5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/50 relative overflow-hidden"
            >
              {/* Lightsaber top accent — glows on hover */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-primary)]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Card header */}
              <div className="flex items-center gap-2.5 mb-4">
                <span
                  className="text-sm w-7 h-7 flex items-center justify-center rounded-md bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/25"
                  role="img"
                  aria-label={group.label}
                >
                  {group.icon}
                </span>
                <h3 className="font-mono text-xs font-semibold text-[var(--color-primary)] uppercase tracking-widest">
                  {group.label}
                </h3>
              </div>

              {/* Skill badges */}
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="sw-badge px-2 py-0.5 font-mono text-[11px] rounded transition-all duration-200"
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
