'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Layers, CheckCircle, Clock } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { projects } from '@/data/portfolio';
import type { Project } from '@/types';

type Filter = 'all' | 'government' | 'saas' | 'migration' | 'freelance';

const filters: { label: string; value: Filter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Freelance', value: 'freelance' },
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
  const tiltRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    el.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) translateZ(8px)`;
  };

  const handleMouseLeave = () => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1)';
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)';
    setTimeout(() => {
      if (el) el.style.transition = '';
    }, 500);
  };

  const handleMouseEnter = () => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.transition = 'transform 0.08s ease';
  };

  return (
    <div
      ref={tiltRef}
      className="will-change-transform"
      style={{ transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        exit={{ opacity: 0, y: 16, scale: 0.96 }}
        transition={{ duration: 0.5, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
        className="clay-card overflow-hidden flex flex-col h-full group"
      >
        {/* Gradient top stripe */}
        <div
          className="h-[3px]"
          style={{
            background:
              project.category === 'government'
                ? 'linear-gradient(90deg, #6c63ff, #4ecdc4)'
                : project.category === 'saas'
                  ? 'linear-gradient(90deg, #ff6b6b, #ffd93d)'
                  : project.category === 'freelance'
                    ? 'linear-gradient(90deg, #ffd93d, #ff6b6b)'
                    : 'linear-gradient(90deg, #4ecdc4, #6c63ff)',
          }}
        />

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
              {isLive && (
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
              )}
            </span>
          </div>

          {/* Project name */}
          <h3 className="font-display font-black text-base text-[var(--color-text)] leading-snug mb-1 group-hover:text-[var(--color-primary)] transition-colors duration-200">
            {project.name}
          </h3>
          <p className="font-mono text-xs text-[var(--color-primary)] mb-3">{project.role}</p>

          {/* Description */}
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4 flex-1">
            {project.description}
          </p>

          {/* Features */}
          <ul className="space-y-1.5 mb-5">
            {project.features.slice(0, 3).map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-[var(--color-text-muted)]">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-[var(--color-primary)] opacity-60 shrink-0" />
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
              <span key={t} className="clay-badge px-2 py-0.5 font-mono text-[11px]">
                {t}
              </span>
            ))}
            {project.tech.length > 6 && (
              <span className="px-2 py-0.5 font-mono text-[11px] text-[var(--color-text-subtle)]">
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
              className="clay-btn w-full justify-center gap-2 px-4 py-2.5 text-xs font-semibold bg-[var(--color-primary)] text-white"
            >
              <ExternalLink size={13} />
              View Live Project
            </a>
          ) : (
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-2xl bg-[var(--color-bg)] text-[var(--color-text-subtle)] border border-[var(--color-border)] cursor-default">
              <Clock size={13} />
              In QA — not yet live
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [active, setActive] = useState<Filter>('all');

  const filtered = active === 'all' ? projects : projects.filter((p) => p.category === active);

  return (
    <section
      id="projects"
      className="section-padding relative overflow-hidden"
      aria-label="Projects"
    >
      <div
        className="blob w-80 h-80 -bottom-10 -right-10 opacity-10 dark:opacity-20 animate-blob-float"
        style={{ background: '#ffd93d' }}
      />

      <div className="container-inner relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            eyebrow="Projects"
            title="What I've built"
            subtitle="Production applications serving government departments, SaaS users, and live freelance clients."
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
              className={`relative px-4 py-2 text-sm font-semibold rounded-2xl transition-all duration-200 ${
                active === f.value
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] border border-[var(--color-border)] hover:text-[var(--color-primary)]'
              }`}
              style={
                active === f.value
                  ? {
                      boxShadow:
                        '0 5px 0 rgba(108,99,255,0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
                    }
                  : {
                      boxShadow:
                        '0 3px 0 rgba(108,99,255,0.12), inset 0 1px 0 rgba(255,255,255,0.5)',
                    }
              }
            >
              {f.label}
              <span
                className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                  active === f.value
                    ? 'bg-white/20 text-white'
                    : 'bg-[var(--color-bg)] text-[var(--color-text-subtle)]'
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
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
