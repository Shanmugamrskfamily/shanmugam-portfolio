import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { personal, social } from '@/data/portfolio';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
      <div className="container-inner py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-bold text-[var(--color-text)] text-lg">
              <span className="text-[var(--color-primary)]">S</span>hanmugam R
              <span className="text-[var(--color-primary)]">.</span>
            </p>
            <p className="text-sm text-[var(--color-text-muted)] mt-1 flex items-center justify-center md:justify-start gap-1">
              <MapPin size={12} />
              {personal.location}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all duration-200"
            >
              <Github size={16} />
            </a>
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all duration-200"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={social.email}
              aria-label="Email"
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all duration-200"
            >
              <Mail size={16} />
            </a>
          </div>

          <p className="text-xs text-[var(--color-text-subtle)] text-center md:text-right">
            © {year} Shanmugam R. Built with Next.js & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
