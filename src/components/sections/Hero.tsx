'use client';

import Image from 'next/image';
import { Github, Linkedin, Mail, Download, ArrowRight, MapPin, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { personal, social, about } from '@/data/portfolio';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut', delay },
});

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* Background grid — Tron cyan on dark, subtle blue on light */}
      <div
        className="absolute inset-0 bg-grid-light dark:bg-grid-dark opacity-60 dark:opacity-100"
        style={{ backgroundSize: '44px 44px' }}
        aria-hidden
      />

      {/* Radial fade over grid */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, transparent 40%, var(--color-bg) 100%)',
        }}
        aria-hidden
      />

      {/* Tron glow blobs */}
      <div
        className="absolute top-1/3 -left-48 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)' }}
        aria-hidden
      />
      <div
        className="absolute bottom-1/4 -right-48 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(155,89,255,0.05) 0%, transparent 70%)' }}
        aria-hidden
      />

      <div className="container-inner relative z-10 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Text side */}
          <div>
            {/* Availability badge */}
            <motion.div {...fadeUp(0)} className="mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono border border-emerald-500/30 bg-emerald-500/5 text-emerald-500 dark:text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Open to Work · Immediate Joiner
              </span>
            </motion.div>

            {/* Name */}
            <motion.div {...fadeUp(0.1)}>
              <p className="font-mono text-xs text-[var(--color-text-subtle)] mb-2 tracking-wider">
                <span className="text-[var(--color-accent)] opacity-70">&gt;</span> Hello, I&apos;m
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[var(--color-text)] leading-[1.05] tracking-tight mb-4">
                Shanmugam <span className="text-gradient dark:text-gradient">R</span>
              </h1>
            </motion.div>

            {/* Title */}
            <motion.div {...fadeUp(0.2)}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xl sm:text-2xl font-semibold text-[var(--color-text-muted)]">
                  Frontend Developer
                </span>
                <span className="font-mono text-[var(--color-text-subtle)] opacity-50">/</span>
                <span className="text-xl sm:text-2xl font-semibold text-[var(--color-primary)]">
                  React & Next.js
                </span>
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.p
              {...fadeUp(0.3)}
              className="text-base sm:text-lg text-[var(--color-text-muted)] leading-relaxed mb-4 max-w-xl"
            >
              {personal.tagline}
            </motion.p>

            {/* Location */}
            <motion.p
              {...fadeUp(0.35)}
              className="flex items-center gap-1.5 font-mono text-xs text-[var(--color-text-subtle)] mb-8"
            >
              <MapPin size={13} />
              {personal.location}
            </motion.p>

            {/* Stats */}
            <motion.div {...fadeUp(0.4)} className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
              {about.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/40 transition-colors group"
                >
                  <p className="text-2xl font-bold text-gradient">{stat.value}</p>
                  <p className="font-mono text-[10px] text-[var(--color-text-subtle)] mt-1 leading-tight uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div {...fadeUp(0.5)} className="flex flex-wrap gap-3 mb-8">
              <a
                href={personal.resumeDownloadUrl}
                download="Shanmugam_R_Resume.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm bg-[var(--color-primary)] text-white hover:opacity-90 hover:shadow-lg active:scale-[0.98] transition-all duration-200"
                style={{ boxShadow: '0 0 20px rgba(8,145,178,0.3)' }}
              >
                <Download size={15} />
                Download Resume
              </a>
              <button
                onClick={() =>
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white active:scale-[0.98] transition-all duration-200"
              >
                View Projects
                <ArrowRight size={15} />
              </button>
              <a
                href={social.email}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/40 active:scale-[0.98] transition-all duration-200"
              >
                <Mail size={15} />
                Contact Me
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div {...fadeUp(0.6)} className="flex items-center gap-3">
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/50 transition-all duration-200"
              >
                <Github size={18} />
              </a>
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/50 transition-all duration-200"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={social.email}
                aria-label="Email"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/50 transition-all duration-200"
              >
                <Mail size={18} />
              </a>
            </motion.div>
          </div>

          {/* Photo side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative mb-10 lg:mb-0">
              {/* Decorative rings */}
              <div className="absolute -inset-4 rounded-full border border-dashed border-[var(--color-primary)]/20 animate-spin-slow" />
              <div className="absolute -inset-8 rounded-full border border-[var(--color-primary)]/08" />

              {/* Tron glow behind photo */}
              <div
                className="absolute inset-0 rounded-full blur-2xl"
                style={{
                  background: 'radial-gradient(circle, rgba(0,229,255,0.14) 0%, transparent 70%)',
                }}
              />

              {/* Photo */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 border-[var(--color-primary)]/60 shadow-glow-cyan">
                <Image
                  src="/images/profile.png"
                  alt="Shanmugam R — Frontend Developer"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 384px"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-2 rounded-full bg-[var(--color-bg)] border border-[var(--color-border)] shadow-lg font-mono text-xs font-semibold text-[var(--color-text)]">
                🏛️ Govt &amp; SaaS Production Apps
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-1 text-[var(--color-text-subtle)]"
        >
          <span className="font-mono text-[10px] tracking-widest uppercase">scroll</span>
          <ChevronDown size={14} className="animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
