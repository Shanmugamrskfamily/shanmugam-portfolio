'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, Download, ArrowRight, MapPin, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { personal, social, about } from '@/data/portfolio';

/* ── Typewriter cycling roles ── */
const ROLES = [
  'Frontend Developer',
  'Full-Stack Developer',
  'React & Next.js Engineer',
  'Production App Builder',
];

/* ── Animated number counter ── */
function AnimatedStat({ value, ready }: { value: string; ready: boolean }) {
  const numMatch = value.match(/\d+/);
  const target = numMatch ? parseInt(numMatch[0]) : 0;
  const suffix = value.replace(/\d/g, '');
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!ready || target === 0) return;
    let frame = 0;
    const totalFrames = 55;
    const id = setInterval(() => {
      frame++;
      const t = frame / totalFrames;
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * target));
      if (frame >= totalFrames) clearInterval(id);
    }, 18);
    return () => clearInterval(id);
  }, [ready, target]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
});

export default function Hero() {
  const [roleText, setRoleText] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'pause' | 'deleting'>('typing');
  const [counterReady, setCounterReady] = useState(false);

  /* Typewriter effect */
  useEffect(() => {
    const current = ROLES[roleIdx];
    let timer: ReturnType<typeof setTimeout>;

    if (phase === 'typing') {
      if (roleText.length < current.length) {
        timer = setTimeout(() => setRoleText(current.slice(0, roleText.length + 1)), 80);
      } else {
        timer = setTimeout(() => setPhase('pause'), 2400);
      }
    } else if (phase === 'pause') {
      timer = setTimeout(() => setPhase('deleting'), 150);
    } else {
      if (roleText.length > 0) {
        timer = setTimeout(() => setRoleText(current.slice(0, roleText.length - 1)), 42);
      } else {
        setRoleIdx((prev) => (prev + 1) % ROLES.length);
        setPhase('typing');
      }
    }

    return () => clearTimeout(timer);
  }, [roleText, phase, roleIdx]);

  /* Start counters after entrance animation finishes */
  useEffect(() => {
    const t = setTimeout(() => setCounterReady(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* Light mode: subtle dot grid */}
      <div
        className="absolute inset-0 block dark:hidden bg-sand-light opacity-60"
        style={{ backgroundSize: '28px 28px' }}
        aria-hidden
      />

      {/* Dark mode: three-layer star field */}
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          backgroundImage: [
            'radial-gradient(circle, rgba(255,255,255,0.9) 1.5px, transparent 1.5px)',
            'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
            'radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '300px 300px, 150px 150px, 75px 75px',
          backgroundPosition: '0 0, 48px 62px, 22px 30px',
          opacity: 0.32,
        }}
        aria-hidden
      />

      {/* Radial fade over background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, transparent 40%, var(--color-bg) 100%)',
        }}
        aria-hidden
      />

      {/* Nebula blobs */}
      <div
        className="absolute top-1/3 -left-48 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(91,200,245,0.07) 0%, transparent 70%)' }}
        aria-hidden
      />
      <div
        className="absolute bottom-1/4 -right-48 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,197,25,0.06) 0%, transparent 70%)' }}
        aria-hidden
      />
      {/* Extra light-mode blob */}
      <div
        className="absolute top-2/3 left-1/3 w-72 h-72 rounded-full blur-3xl pointer-events-none block dark:hidden"
        style={{ background: 'radial-gradient(circle, rgba(109,40,217,0.04) 0%, transparent 70%)' }}
        aria-hidden
      />

      <div className="container-inner relative z-10 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* ── Text side ── */}
          <div>
            {/* Availability badge */}
            <motion.div {...fadeUp(0)} className="mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono border border-emerald-500/30 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 animate-float">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Open to Work · Immediate Joiner
              </span>
            </motion.div>

            {/* Name */}
            <motion.div {...fadeUp(0.1)}>
              <p className="font-display text-[10px] text-[var(--color-text-subtle)] mb-2 tracking-[0.25em] uppercase">
                <span className="text-[var(--color-accent)] opacity-80">{'✦'}</span> Hello, I&apos;m
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[var(--color-text)] leading-[1.05] tracking-tight mb-4">
                Shanmugam <span className="text-gradient dark:text-gradient">R</span>
              </h1>
            </motion.div>

            {/* Typewriter role */}
            <motion.div {...fadeUp(0.2)}>
              <div className="flex items-center gap-2 mb-6 min-h-[2.5rem]">
                <span className="text-xl sm:text-2xl font-semibold text-[var(--color-primary)]">
                  {roleText}
                  <span className="cursor-blink inline-block w-[2px] h-5 ml-0.5 bg-[var(--color-primary)] align-middle" />
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
                  className="text-center p-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/40 transition-all duration-300 group stat-shimmer hover:scale-[1.03]"
                >
                  <p className="text-2xl font-bold text-gradient">
                    <AnimatedStat value={stat.value} ready={counterReady} />
                  </p>
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
                className="btn-shimmer inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm bg-[var(--color-primary)] text-white hover:opacity-90 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] transition-all duration-200"
                style={{
                  boxShadow: '0 0 20px color-mix(in srgb, var(--color-primary) 35%, transparent)',
                }}
              >
                <Download size={15} />
                Download Resume
              </a>
              <button
                onClick={() =>
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="btn-shimmer inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                View Projects
                <ArrowRight size={15} />
              </button>
              <a
                href={social.email}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <Mail size={15} />
                Contact Me
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div {...fadeUp(0.6)} className="flex items-center gap-3">
              {[
                { href: social.github, Icon: Github, label: 'GitHub' },
                { href: social.linkedin, Icon: Linkedin, label: 'LinkedIn' },
                { href: social.email, Icon: Mail, label: 'Email' },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={label !== 'Email' ? '_blank' : undefined}
                  rel={label !== 'Email' ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/50 hover:scale-110 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Icon size={18} />
                </a>
              ))}

              {/* Tech stack mini-pills */}
              <div className="ml-3 hidden sm:flex items-center gap-1.5">
                {['React', 'Next.js', 'TypeScript'].map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + i * 0.1, duration: 0.4 }}
                    className="px-2 py-0.5 font-mono text-[10px] rounded-full border border-[var(--color-primary)]/25 bg-[var(--color-primary)]/6 text-[var(--color-primary)]"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Photo side ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative mb-10 lg:mb-0">
              {/* Outer spin ring */}
              <div className="absolute -inset-6 rounded-full border border-dashed border-[var(--color-primary)]/15 animate-spin-slow" />
              {/* Middle static ring */}
              <div className="absolute -inset-3 rounded-full border border-[var(--color-primary)]/08" />

              {/* Force glow */}
              <div
                className="absolute inset-0 rounded-full blur-3xl"
                style={{
                  background: 'radial-gradient(circle, rgba(91,200,245,0.14) 0%, transparent 70%)',
                }}
              />

              {/* Photo with pulsing ring */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden photo-ring">
                <Image
                  src="/images/profile.png"
                  alt="Shanmugam R — Frontend Developer"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 384px"
                />
              </div>

              {/* Floating badge — anchored within the photo container width */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -bottom-4 left-0 right-0 flex justify-center"
              >
                <span className="whitespace-nowrap px-4 py-2 rounded-full bg-[var(--color-bg)] border border-[var(--color-border)] shadow-lg font-mono text-xs font-semibold text-[var(--color-text)]">
                  🏛️ Govt · SaaS · Freelance
                </span>
              </motion.div>

              {/* Side floating stat chip */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
                className="absolute -right-4 top-1/3 px-3 py-2 rounded-xl bg-[var(--color-surface)] border border-[var(--color-primary)]/30 shadow-lg animate-float"
                style={{ animationDelay: '0.5s' }}
              >
                <p className="font-mono text-xs font-bold text-gradient leading-none">7</p>
                <p className="font-mono text-[9px] text-[var(--color-text-subtle)] leading-none mt-0.5">
                  Live Apps
                </p>
              </motion.div>

              {/* Left floating chip */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="absolute -left-4 top-1/2 px-3 py-2 rounded-xl bg-[var(--color-surface)] border border-[var(--color-primary)]/30 shadow-lg animate-float"
                style={{ animationDelay: '1.2s' }}
              >
                <p className="font-mono text-xs font-bold text-gradient leading-none">2+</p>
                <p className="font-mono text-[9px] text-[var(--color-text-subtle)] leading-none mt-0.5">
                  Yrs Exp
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-1 text-[var(--color-text-subtle)]"
        >
          <span className="font-display text-[9px] tracking-widest uppercase">scroll</span>
          <ChevronDown size={14} className="animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
