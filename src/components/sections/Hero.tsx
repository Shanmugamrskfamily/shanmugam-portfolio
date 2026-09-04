'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Github, Linkedin, Mail, Download, ArrowRight, MapPin, ChevronDown } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { personal, social, about } from '@/data/portfolio';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import HeroSceneWrapper from '@/components/three/HeroSceneWrapper';
import { useMagneticHover } from '@/hooks/useMagneticHover';

const ROLES = [
  'Full-Stack Developer',
  'React & Next.js Engineer',
  'Node.js & Express Developer',
  'Production App Builder',
];

const spring = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1], delay },
});

function TypewriterRole() {
  const [displayText, setDisplayText] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'waiting' | 'deleting'>('typing');

  useEffect(() => {
    const current = ROLES[roleIdx];

    if (phase === 'typing') {
      if (displayText.length < current.length) {
        const t = setTimeout(() => setDisplayText(current.slice(0, displayText.length + 1)), 85);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase('deleting'), 2200);
        return () => clearTimeout(t);
      }
    }

    if (phase === 'deleting') {
      if (displayText.length > 0) {
        const t = setTimeout(() => setDisplayText(current.slice(0, displayText.length - 1)), 45);
        return () => clearTimeout(t);
      } else {
        setRoleIdx((prev) => (prev + 1) % ROLES.length);
        setPhase('typing');
      }
    }
  }, [displayText, phase, roleIdx]);

  return (
    <div className="flex items-center gap-1 text-xl sm:text-2xl font-display font-bold text-[var(--color-primary)] min-h-[2rem]">
      <span>{displayText}</span>
      <span className="animate-cursor w-[2px] h-6 bg-[var(--color-primary)] rounded-full inline-block" />
    </div>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const resumeBtnRef = useMagneticHover<HTMLAnchorElement>(0.25);
  const contactBtnRef = useMagneticHover<HTMLAnchorElement>(0.25);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Introduction"
    >
      <div className="container-inner relative z-10 pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* ── Left: Text ── */}
          <div>
            {/* Open to work badge */}
            <motion.div {...spring(0)} className="mb-6">
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-emerald-600 dark:text-emerald-400"
                style={{
                  background: 'rgba(107,203,119,0.12)',
                  border: '1.5px solid rgba(107,203,119,0.3)',
                  boxShadow: '0 3px 0 rgba(107,203,119,0.2), inset 0 1px 0 rgba(255,255,255,0.4)',
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Open to Work · Immediate Joiner
              </span>
            </motion.div>

            {/* Name */}
            <motion.div {...spring(0.1)} className="mb-3">
              <p className="font-mono text-xs text-[var(--color-text-subtle)] mb-2 tracking-widest uppercase">
                Hello, I&apos;m
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-black leading-[1.05] tracking-tight">
                <span className="text-[var(--color-text)]">Shanmugam </span>
                <span className="text-gradient">R</span>
              </h1>
            </motion.div>

            {/* Typewriter role */}
            <motion.div {...spring(0.2)} className="mb-5">
              <TypewriterRole />
            </motion.div>

            {/* Tagline */}
            <motion.p
              {...spring(0.3)}
              className="text-base sm:text-lg text-[var(--color-text-muted)] leading-relaxed mb-3 max-w-xl"
            >
              {personal.tagline}
            </motion.p>

            {/* Location */}
            <motion.p
              {...spring(0.35)}
              className="flex items-center gap-1.5 font-mono text-xs text-[var(--color-text-subtle)] mb-8"
            >
              <MapPin size={13} />
              {personal.location}
            </motion.p>

            {/* Stats */}
            <motion.div {...spring(0.4)} className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
              {about.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="clay-card-sm p-4 text-center group hover:cursor-default"
                >
                  <p className="text-2xl font-display font-black text-gradient">
                    <AnimatedCounter value={stat.value} inView={inView} />
                  </p>
                  <p className="font-mono text-[10px] text-[var(--color-text-subtle)] mt-1 uppercase tracking-wider leading-tight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div {...spring(0.5)} className="flex flex-wrap gap-3 mb-8">
              <a
                ref={resumeBtnRef}
                href={personal.resumeDownloadUrl}
                download="Shanmugam_R_Resume.pdf"
                className="clay-btn gap-2 px-6 py-3 text-sm bg-[var(--color-primary)] text-white"
              >
                <Download size={15} />
                Download Resume
              </a>
              <button
                onClick={() =>
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="clay-btn gap-2 px-6 py-3 text-sm bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)]"
              >
                View Projects
                <ArrowRight size={15} />
              </button>
              <a
                ref={contactBtnRef}
                href={social.email}
                className="clay-btn gap-2 px-6 py-3 text-sm bg-[var(--color-secondary)] text-white"
              >
                <Mail size={15} />
                Contact Me
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div {...spring(0.6)} className="flex items-center gap-2">
              {[
                { href: social.github, icon: <Github size={18} />, label: 'GitHub' },
                { href: social.linkedin, icon: <Linkedin size={18} />, label: 'LinkedIn' },
                { href: social.email, icon: <Mail size={18} />, label: 'Email' },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="clay-card-sm w-10 h-10 flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                >
                  {icon}
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Photo ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1], delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* 3D wireframe polyhedron — sized to wrap around the photo, responsive at every breakpoint */}
              <HeroSceneWrapper />

              {/* Floating stat: top-right */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -top-4 -right-6 px-4 py-2.5 text-center z-10 animate-float rounded-2xl text-white"
                style={{
                  background: 'var(--gradient-primary)',
                  boxShadow:
                    '0 8px 24px rgba(108, 99, 255, 0.45), inset 0 1px 0 rgba(255,255,255,0.3)',
                }}
              >
                <p className="text-lg font-display font-black leading-none">6</p>
                <p className="font-mono text-[10px] opacity-90 mt-0.5">Products</p>
              </motion.div>

              {/* Floating stat: bottom-left */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -bottom-4 -left-6 px-4 py-2.5 text-center z-10 animate-float-slow rounded-2xl text-white"
                style={{
                  background: 'var(--gradient-accent)',
                  boxShadow:
                    '0 8px 24px rgba(255, 107, 107, 0.45), inset 0 1px 0 rgba(255,255,255,0.3)',
                }}
              >
                <p className="text-lg font-display font-black leading-none">2.5+</p>
                <p className="font-mono text-[10px] opacity-90 mt-0.5">Yrs Exp</p>
              </motion.div>

              {/* Photo with spinning gradient ring */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
                {/* Outer spinning gradient ring */}
                <div
                  className="absolute -inset-[4px] rounded-full animate-spin-slow"
                  style={{
                    background:
                      'conic-gradient(from 0deg, #6c63ff, #ff6b6b, #ffd93d, #4ecdc4, #6c63ff)',
                  }}
                />
                {/* White gap ring */}
                <div className="absolute -inset-[1px] rounded-full bg-[var(--color-bg)]" />
                {/* Photo */}
                <div
                  className="relative w-full h-full rounded-full overflow-hidden"
                  style={{ boxShadow: 'var(--clay-lg)' }}
                >
                  <Image
                    src="/images/profile.png"
                    alt="Shanmugam R — Full-Stack Developer"
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="(max-width: 640px) 256px, (max-width: 1024px) 288px, 320px"
                  />
                </div>
              </div>

              {/* Bottom badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute -bottom-10 left-0 right-0 flex justify-center"
              >
                <span
                  className="whitespace-nowrap px-4 py-2 rounded-full font-mono text-xs font-bold text-[var(--color-primary)]"
                  style={{
                    background: 'var(--color-surface)',
                    border: '1.5px solid var(--color-primary)',
                    boxShadow: '0 6px 20px rgba(108, 99, 255, 0.3), var(--clay-sm)',
                  }}
                >
                  Govt · SaaS · Freelance
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-1.5 text-[var(--color-text-subtle)]"
        >
          <span className="font-mono text-[10px] tracking-widest uppercase">scroll</span>
          <ChevronDown size={14} className="animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
