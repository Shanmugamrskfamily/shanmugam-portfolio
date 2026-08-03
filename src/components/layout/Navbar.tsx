'use client';

import { useState, useEffect, useCallback } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import ThemeToggle from '@/components/ThemeToggle';
import { navItems, personal } from '@/data/portfolio';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60);
    const sections = navItems.map((item) => item.href.replace('#', ''));
    let current = '';
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 120) current = id;
    }
    setActiveSection(current);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-4 pointer-events-none">
      <div className="container-inner pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={cn(
            'flex items-center justify-between transition-all duration-500',
            scrolled ? 'clay-card px-5 py-3' : 'px-0 py-2'
          )}
        >
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            className="flex items-center gap-2.5 font-display font-bold text-base text-[var(--color-text)] hover:opacity-80 transition-opacity"
          >
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-black shrink-0"
              style={{
                background: 'linear-gradient(135deg, #6c63ff, #ff6b6b)',
                boxShadow: '0 4px 0 rgba(108,99,255,0.4), 0 6px 14px rgba(108,99,255,0.25)',
              }}
            >
              S
            </span>
            <span className="hidden sm:block">
              <span className="text-[var(--color-primary)]">Shan</span>mugam
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    'relative px-3.5 py-2 text-sm font-semibold rounded-xl transition-all duration-200',
                    isActive
                      ? 'text-[var(--color-primary)]'
                      : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-xl -z-10"
                      style={{
                        background: 'rgba(108,99,255,0.1)',
                        boxShadow: '0 3px 0 rgba(108,99,255,0.18)',
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2.5">
            <ThemeToggle />
            <a
              href={personal.resumeDownloadUrl}
              download="Shanmugam_R_Resume.pdf"
              className="clay-btn inline-flex items-center gap-2 px-4 py-2 text-sm bg-[var(--color-primary)] text-white"
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
              className="clay-card-sm w-9 h-9 flex items-center justify-center text-[var(--color-text-muted)]"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </motion.div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="clay-card mt-2 p-3 space-y-1"
            >
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    'w-full text-left px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors',
                    activeSection === item.href.replace('#', '')
                      ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/10'
                      : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg)]'
                  )}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 border-t border-[var(--color-border)]">
                <a
                  href={personal.resumeDownloadUrl}
                  download="Shanmugam_R_Resume.pdf"
                  onClick={() => setIsOpen(false)}
                  className="clay-btn flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm bg-[var(--color-primary)] text-white mt-2"
                >
                  <Download size={14} />
                  Download Resume
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
