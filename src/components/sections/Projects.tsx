'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Layers, CheckCircle, Clock } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { projects } from '@/data/portfolio';
import type { Project } from '@/types';

type Filter = 'all' | 'government' | 'saas' | 'migration';

const filters: { label: string; value: Filter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Government', value: 'government' },
  { label: 'SaaS', value: 'saas' },
  { label: 'Migration', value: 'migration' },
];

function ProjectCard({
  project,
  index,
  inView,
}: {
  project: Project;
  index: number;
  inView: boolean;
}) {
  const isLive = project.status === 'Live';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="flex flex-col rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden hover:border-[var(--color-primary)]/40 hover:shadow-lg transition-all duration-300 group"
    >
      {/* Card header stripe */}
      <div className="h-1.5 bg-gradient-to-r from-navy-800 to-navy-600 dark:from-navy-400 dark:to-navy-300" />

      <div className="flex flex-col flex-1 p-5 sm:p-6">
        {/* Type & Status row */}
        <div className="flex items-center justify-between mb-3">
          <span className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-muted)]">
            <Layers size={12} />
            {project.type}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full ${
              isLive
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/30'
                : 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/30'
            }`}
          >
            {isLive ? <CheckCircle size={11} /> : <Clock size={11} />}
            {project.status}
          </span>
        </div>

        {/* Project name */}
        <h3 className="text-base font-bold text-[var(--color-text)] leading-snug mb-1 group-hover:text-[var(--color-primary)] transition-colors">
          {project.name}
        </h3>
        <p className="text-xs text-[var(--color-primary)] font-medium mb-3">{project.role}</p>

        {/* Description */}
        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {/* Features */}
        <ul className="space-y-1.5 mb-5">
          {project.features.slice(0, 3).map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-[var(--color-text-muted)]">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-[var(--color-primary)]/60 shrink-0" />
              {f}
            </li>
          ))}
          {project.features.length > 3 && (
            <li className="text-xs text-[var(--color-text-subtle)] pl-3">
              +{project.features.length - 3} more features
            </li>
          )}
        </ul>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.slice(0, 6).map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-xs font-medium rounded-md bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-muted)]"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 6 && (
            <span className="px-2 py-0.5 text-xs text-[var(--color-text-subtle)]">
              +{project.tech.length - 6}
            </span>
          )}
        </div>

        {/* Link */}
        {project.live_url ? (
          <a
            href={project.live_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] transition-all duration-200 active:scale-[0.98]"
          >
            <ExternalLink size={13} />
            View Live Project
          </a>
        ) : (
          <div className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg bg-[var(--color-surface)] text-[var(--color-text-subtle)] border border-[var(--color-border)] cursor-default">
            <Clock size={13} />
            In QA — not yet live
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [active, setActive] = useState<Filter>('all');

  const filtered = active === 'all' ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="section-padding" aria-label="Projects">
      <div className="container-inner" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            eyebrow="Projects"
            title="What I've built"
            subtitle="Production applications serving government departments and thousands of users."
          />
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-10"
          role="tablist"
          aria-label="Filter projects"
        >
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              role="tab"
              aria-selected={active === f.value}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                active === f.value
                  ? 'bg-[var(--color-primary)] text-white shadow-sm'
                  : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] border border-[var(--color-border)] hover:text-[var(--color-text)] hover:border-[var(--color-primary)]/30'
              }`}
            >
              {f.label}
              <span
                className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                  active === f.value
                    ? 'bg-white/20 text-white'
                    : 'bg-[var(--color-border)] text-[var(--color-text-muted)]'
                }`}
              >
                {f.value === 'all'
                  ? projects.length
                  : projects.filter((p) => p.category === f.value).length}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.name} project={project} index={i} inView={inView} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
