'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import ThemeToggle from '@/components/ThemeToggle';
import { navItems, personal } from '@/data/portfolio';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);

    const sections = navItems.map((item) => item.href.replace('#', ''));
    let current = '';
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 120) {
        current = id;
      }
    }
    setActiveSection(current);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-[var(--color-bg)]/80 backdrop-blur-xl border-b border-[var(--color-border)]/60 shadow-lg shadow-[var(--color-bg)]/20'
          : 'bg-transparent'
      )}
    >
      <nav className="container-inner">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-mono font-bold text-sm tracking-tight hover:text-[var(--color-primary)] transition-colors text-[var(--color-text)]"
            aria-label="Scroll to top"
          >
            <span className="font-display text-[var(--color-accent)] opacity-70 mr-0.5">✦</span>
            <span className="text-[var(--color-primary)]">Shanmugam</span>
            <span className="font-display text-[var(--color-accent)] opacity-70 ml-0.5">✦</span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    'relative px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200',
                    isActive
                      ? 'text-[var(--color-primary)]'
                      : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-md bg-[var(--color-surface)] border border-[var(--color-primary)]/20 -z-10"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] w-4 rounded-full"
                      style={{ background: 'var(--gradient-primary)' }}
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <a
              href={personal.resumeDownloadUrl}
              download="Shanmugam_R_Resume.pdf"
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200',
                'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] hover:shadow-md active:scale-[0.98]'
              )}
            >
              <Download size={14} />
              Resume
            </a>
          </div>

          {/* Mobile actions */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-[var(--color-border)] py-4 space-y-1 bg-[var(--color-bg)]/95 backdrop-blur-xl"
            >
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    'w-full text-left px-4 py-2.5 text-sm font-medium rounded-md transition-colors',
                    activeSection === item.href.replace('#', '')
                      ? 'text-[var(--color-primary)] bg-[var(--color-surface)]'
                      : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)]'
                  )}
                >
                  {item.label}
                </button>
              ))}
              <div className="px-4 pt-2">
                <a
                  href={personal.resumeDownloadUrl}
                  download="Shanmugam_R_Resume.pdf"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-semibold rounded-lg bg-[var(--color-primary)] text-white"
                  onClick={() => setIsOpen(false)}
                >
                  <Download size={14} />
                  Download Resume
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
