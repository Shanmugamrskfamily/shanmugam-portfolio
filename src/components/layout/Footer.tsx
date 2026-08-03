import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { personal, social } from '@/data/portfolio';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
      <div className="container-inner py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="font-display font-black text-lg text-[var(--color-text)]">
              <span className="text-[var(--color-primary)]">S</span>hanmugam R
              <span className="text-[var(--color-primary)]">.</span>
            </p>
            <p className="text-sm text-[var(--color-text-muted)] mt-1 flex items-center justify-center md:justify-start gap-1">
              <MapPin size={12} />
              {personal.location}
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-2">
            {[
              { href: social.github, icon: <Github size={16} />, label: 'GitHub' },
              { href: social.linkedin, icon: <Linkedin size={16} />, label: 'LinkedIn' },
              { href: social.email, icon: <Mail size={16} />, label: 'Email' },
            ].map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors rounded-2xl"
                style={{
                  background: 'var(--color-surface)',
                  border: '1.5px solid var(--color-border)',
                  boxShadow: '0 3px 0 rgba(108,99,255,0.12), inset 0 1px 0 rgba(255,255,255,0.5)',
                }}
              >
                {icon}
              </a>
            ))}
          </div>

          <p className="text-xs text-[var(--color-text-subtle)] text-center md:text-right">
            © {year} Shanmugam R. Built with Next.js &amp; Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
