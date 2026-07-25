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
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="group sw-card card-shimmer p-5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/50 hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden"
            >
              {/* Glowing top edge on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-400" />

              {/* Subtle glow blob behind card on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
                style={{
                  background:
                    'radial-gradient(ellipse 80% 50% at 50% 0%, color-mix(in srgb, var(--color-primary) 6%, transparent), transparent)',
                }}
              />

              {/* Card header */}
              <div className="flex items-center gap-2.5 mb-4 relative">
                <span
                  className="text-sm w-8 h-8 flex items-center justify-center rounded-lg bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/25 group-hover:bg-[var(--color-primary)]/15 transition-colors duration-300"
                  role="img"
                  aria-label={group.label}
                >
                  {group.icon}
                </span>
                <h3 className="font-mono text-xs font-semibold text-[var(--color-primary)] uppercase tracking-widest flex-1">
                  {group.label}
                </h3>
                {/* Skill count badge */}
                <span className="font-mono text-[10px] text-[var(--color-text-subtle)] bg-[var(--color-primary)]/6 border border-[var(--color-primary)]/15 px-1.5 py-0.5 rounded-full tabular-nums">
                  {group.skills.length}
                </span>
              </div>

              {/* Skill badges — staggered */}
              <div className="flex flex-wrap gap-1.5 relative">
                {group.skills.map((skill, j) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.75 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.3,
                      delay: i * 0.06 + j * 0.025,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="sw-badge px-2 py-0.5 font-mono text-[11px] rounded transition-all duration-200 cursor-default hover:scale-105"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
