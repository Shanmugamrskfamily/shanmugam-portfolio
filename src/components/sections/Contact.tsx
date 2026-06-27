'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Download, Send } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { personal, social } from '@/data/portfolio';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const contactItems = [
    {
      icon: <Mail size={20} />,
      label: 'Email',
      value: personal.email,
      href: social.email,
    },
    {
      icon: <Phone size={20} />,
      label: 'Phone',
      value: personal.phone,
      href: `tel:${personal.phone.replace(/\s/g, '')}`,
    },
    {
      icon: <MapPin size={20} />,
      label: 'Location',
      value: personal.location,
      href: null,
    },
  ];

  return (
    <section id="contact" className="section-padding" aria-label="Contact">
      <div className="container-inner" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            eyebrow="Contact"
            title="Let's work together"
            subtitle="I'm actively looking for full-time frontend roles in Chennai. Immediate joiner. Let's connect."
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {/* Availability card */}
            <div
              className="p-5 rounded-xl bg-[var(--color-primary)] text-white"
              style={{ boxShadow: '0 0 24px rgba(8,145,178,0.3)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-xs font-semibold text-white/80 uppercase tracking-wide">
                  Availability
                </span>
              </div>
              <p className="font-semibold text-base">{personal.availability}</p>
            </div>

            {/* Contact items */}
            {contactItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-4 p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs text-[var(--color-text-muted)] mb-0.5">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-[var(--color-text)]">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-primary)]/30 transition-all duration-200"
              >
                <Github size={16} />
                GitHub
              </a>
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-primary)]/30 transition-all duration-200"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
            </div>
          </motion.div>

          {/* CTA panel */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)]"
          >
            <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">Ready to connect?</h3>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-8">
              Whether you have an open role, a project idea, or just want to say hello — my inbox is
              always open. I typically respond within 24 hours.
            </p>

            <div className="space-y-3">
              <a
                href={social.email}
                className="flex items-center justify-center gap-2 w-full px-6 py-3.5 text-sm font-semibold rounded-xl bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] hover:shadow-md active:scale-[0.98] transition-all duration-200"
              >
                <Send size={15} />
                Send Me an Email
              </a>
              <a
                href={personal.resumeDownloadUrl}
                download="Shanmugam_R_Resume.pdf"
                className="flex items-center justify-center gap-2 w-full px-6 py-3.5 text-sm font-semibold rounded-xl border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white active:scale-[0.98] transition-all duration-200"
              >
                <Download size={15} />
                Download Resume
              </a>
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-6 py-3.5 text-sm font-semibold rounded-xl bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-border)] active:scale-[0.98] transition-all duration-200"
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
