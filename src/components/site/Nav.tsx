'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { navItems, person, RESUME_VIEW_URL } from '@/data/portfolio';
import { usePageUI } from './PageShell';
import styles from '../sections/sections.module.css';

const noop = () => () => {};
const useMounted = () =>
  useSyncExternalStore(
    noop,
    () => true,
    () => false
  );

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const dark = useMounted() && resolvedTheme === 'dark';
  return (
    <button
      type="button"
      className={styles.theme}
      aria-label={dark ? 'Switch to drafting (light) mode' : 'Switch to blueprint (dark) mode'}
      onClick={() => setTheme(dark ? 'light' : 'dark')}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        <circle cx="9" cy="9" r="7" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9 2a7 7 0 0 1 0 14z" fill="currentColor" />
      </svg>
    </button>
  );
}

/** Marks the section currently in view, and draws reading progress as a redline under the bar. */
function useScrollSpy(ids: string[]) {
  const [current, setCurrent] = useState<string | null>(null);
  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setCurrent(hit.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return current;
}

const SECTION_IDS = navItems.map((n) => n.href.slice(1));

export default function Nav() {
  const { openPalette } = usePageUI();
  const current = useScrollSpy(SECTION_IDS);
  const bar = useRef<HTMLSpanElement>(null);
  const mac = useMounted() && /Mac|iPhone|iPad/.test(navigator.userAgent);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.current?.style.setProperty(
        'transform',
        `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`
      );
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header className={styles.nav}>
      <div className={styles.navIn}>
        <a className={styles.mark} href="#top">
          <i>SR</i>
          {person.name}
        </a>
        <nav className={styles.links} aria-label="Sections">
          {navItems.map((n) => (
            <a
              key={n.href}
              href={n.href}
              aria-current={current === n.href.slice(1) ? 'location' : undefined}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className={styles.search}
          onClick={openPalette}
          aria-label="Open command palette"
          aria-keyshortcuts="Control+K Meta+K"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
            <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          <span className={styles.searchLabel}>Search</span>
          <kbd>{mac ? '⌘' : 'Ctrl'} K</kbd>
        </button>
        <ThemeToggle />
        <a
          className={`btn btn-solid btn-sm ${styles.navBtn}`}
          href={RESUME_VIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Résumé of ${person.name} (opens in new tab)`}
        >
          Résumé
        </a>
      </div>
      <span ref={bar} className={styles.progress} aria-hidden="true" />
    </header>
  );
}
