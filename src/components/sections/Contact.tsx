'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Download, Send, Laptop } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { personal, social, openToWork } from '@/data/portfolio';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const contactItems = [
    { icon: <Mail size={18} />, label: 'Email', value: personal.email, href: social.email },
    {
      icon: <Phone size={18} />,
      label: 'Phone',
      value: personal.phone,
      href: `tel:${personal.phone.replace(/\s/g, '')}`,
    },
    { icon: <MapPin size={18} />, label: 'Location', value: personal.location, href: null },
  ];

  return (
    <section id="contact" className="section-padding relative overflow-hidden" aria-label="Contact">
      <div
        className="blob w-96 h-96 -top-10 -left-20 opacity-10 dark:opacity-20"
        style={{ background: '#6c63ff' }}
      />
      <div
        className="blob w-72 h-72 bottom-0 -right-10 opacity-10 dark:opacity-20"
        style={{ background: '#ff6b6b' }}
      />

      <div className="container-inner relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            eyebrow="Contact"
            title="Let's work together"
            subtitle="I'm looking for full-time Full-Stack or Frontend roles in Chennai, Bangalore or Hyderabad — on-site, hybrid, or remote. Immediate joiner. Let's connect."
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left: contact info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-3"
          >
            {/* Availability badge */}
            <div
              className="p-5 rounded-3xl text-white overflow-hidden relative"
              style={{
                background: 'linear-gradient(135deg, #6c63ff 0%, #ff6b6b 100%)',
                boxShadow:
                  '0 10px 0 rgba(108,99,255,0.3), 0 16px 24px rgba(108,99,255,0.2), inset 0 1px 0 rgba(255,255,255,0.2)',
              }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-xs font-bold text-white/75 uppercase tracking-widest">
                  Open to Work
                </span>
              </div>

              <p className="font-display font-black text-lg leading-snug">
                {openToWork.roles.join(' / ')} roles
              </p>
              <p className="text-sm font-semibold text-white/85 mt-0.5">{personal.availability}</p>

              <div className="mt-3.5 space-y-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  <MapPin size={13} className="text-white/70 shrink-0" aria-hidden="true" />
                  <span className="sr-only">Locations:</span>
                  {openToWork.locations.map((loc) => (
                    <span
                      key={loc}
                      className="px-2.5 py-0.5 rounded-full bg-white/15 text-[11px] font-bold"
                    >
                      {loc}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <Laptop size={13} className="text-white/70 shrink-0" aria-hidden="true" />
                  <span className="sr-only">Work modes:</span>
                  {openToWork.workModes.map((mode) => (
                    <span
                      key={mode}
                      className="px-2.5 py-0.5 rounded-full bg-white/15 text-[11px] font-bold"
                    >
                      {mode}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact items */}
            {contactItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                className="clay-card-sm flex items-center gap-4 p-4"
              >
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-[var(--color-primary)] shrink-0"
                  style={{
                    background: 'rgba(108,99,255,0.1)',
                    border: '1.5px solid rgba(108,99,255,0.2)',
                    boxShadow: '0 3px 0 rgba(108,99,255,0.15)',
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-subtle)] mb-0.5">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm font-semibold text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-[var(--color-text)]">{item.value}</p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Social links */}
            <div className="flex items-center gap-2 pt-1">
              {[
                { href: social.github, icon: <Github size={16} />, label: 'GitHub' },
                { href: social.linkedin, icon: <Linkedin size={16} />, label: 'LinkedIn' },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clay-btn gap-2 px-4 py-2.5 text-sm text-[var(--color-text-muted)] bg-[var(--color-surface)] border border-[var(--color-border)] hover:text-[var(--color-primary)]"
                >
                  {icon}
                  {label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: CTA panel */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="clay-card p-8"
          >
            <h3 className="font-display font-black text-xl text-[var(--color-text)] mb-2">
              Ready to connect?
            </h3>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-8">
              Whether you have an open role, a project idea, or just want to say hello — my inbox is
              always open. I typically respond within 24 hours.
            </p>

            <div className="space-y-3">
              <a
                href={social.email}
                className="clay-btn w-full justify-center gap-2 px-6 py-3.5 text-sm font-semibold bg-[var(--color-primary)] text-white"
              >
                <Send size={15} />
                Send Me an Email
              </a>
              <a
                href={personal.resumeDownloadUrl}
                download="Shanmugam_R_Resume.pdf"
                className="clay-btn w-full justify-center gap-2 px-6 py-3.5 text-sm font-semibold bg-[var(--color-surface)] text-[var(--color-primary)] border-2 border-[var(--color-primary)]"
              >
                <Download size={15} />
                Download Resume
              </a>
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="clay-btn w-full justify-center gap-2 px-6 py-3.5 text-sm font-semibold bg-[var(--color-bg)] text-[var(--color-text)] border border-[var(--color-border)]"
              >
                <Linkedin size={15} />
                Connect on LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
