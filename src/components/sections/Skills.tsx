'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import { skillGroups } from '@/data/portfolio';

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="section-padding relative overflow-hidden" aria-label="Skills">
      <div
        className="blob w-96 h-96 -bottom-20 -left-20 opacity-10 dark:opacity-20 animate-blob-float"
        style={{ background: '#6c63ff' }}
      />

      <div className="container-inner relative z-10" ref={ref}>
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 28, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.34, 1.56, 0.64, 1] }}
              className="group clay-card p-5 relative overflow-hidden"
            >
              {/* Hover top stripe */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-[24px]"
                style={{ background: 'linear-gradient(90deg, #6c63ff, #ff6b6b, #ffd93d)' }}
              />

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-9 h-9 flex items-center justify-center rounded-2xl text-base shrink-0"
                    style={{
                      background: 'rgba(108,99,255,0.1)',
                      border: '1.5px solid rgba(108,99,255,0.2)',
                      boxShadow: '0 3px 0 rgba(108,99,255,0.15)',
                    }}
                  >
                    {group.icon}
                  </span>
                  <h3 className="font-display font-black text-[11px] uppercase tracking-widest text-[var(--color-primary)]">
                    {group.label}
                  </h3>
                </div>
                <span
                  className="font-mono text-[11px] font-bold px-2 py-0.5 rounded-full text-[var(--color-text-subtle)]"
                  style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}
                >
                  {group.skills.length}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((skill, j) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.75 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: i * 0.05 + j * 0.025 + 0.2, duration: 0.3 }}
                    className="clay-badge px-2.5 py-1 font-mono text-[11px] font-medium"
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
