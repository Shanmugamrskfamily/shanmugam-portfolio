'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type { Capability } from '@/types';
import CommandPalette from './CommandPalette';

interface PageUI {
  filter: Capability | null;
  setFilter: (c: Capability | null) => void;
  toast: (message: string) => void;
  openPalette: () => void;
}

const Ctx = createContext<PageUI | null>(null);

export function usePageUI() {
  const ui = useContext(Ctx);
  if (!ui) throw new Error('usePageUI must be used inside <PageShell>');
  return ui;
}

/**
 * Page-wide interaction layer:
 * - capability filter (dims work that doesn't match, via data-filter + data-caps)
 * - toasts for copy actions
 * - the command palette
 * - scroll reveals and the cursor spotlight on cards (progressive enhancement:
 *   without JavaScript everything is simply visible and static)
 */
export default function PageShell({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState<Capability | null>(null);
  const [message, setMessage] = useState('');
  const [paletteOpen, setPaletteOpen] = useState(false);
  const toastTimer = useRef(0);

  const toast = useCallback((m: string) => {
    setMessage(m);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setMessage(''), 2200);
  }, []);
  const openPalette = useCallback(() => setPaletteOpen(true), []);

  // Ctrl/⌘ + K opens the palette from anywhere
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Scroll reveals: only hide things once JS is running and motion is allowed
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = document.documentElement;
    root.classList.add('js-reveal');
    const timers: number[] = [];
    const show = (el: Element) => {
      el.classList.add('is-in');
      // Stagger delays only belong to the entrance; drop them so later hovers and filters feel instant
      if (el.hasAttribute('data-stagger')) {
        timers.push(
          window.setTimeout(
            () =>
              Array.from(el.children).forEach((c) =>
                (c as HTMLElement).style.removeProperty('transition-delay')
              ),
            1400
          )
        );
      }
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (!en.isIntersecting) continue;
          show(en.target);
          io.unobserve(en.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      if (el.hasAttribute('data-stagger')) {
        Array.from(el.children).forEach(
          (c, i) => ((c as HTMLElement).style.transitionDelay = `${Math.min(i, 8) * 70}ms`)
        );
      }
      // Anything already on screen shows immediately, so nothing blinks on load
      if (el.getBoundingClientRect().top < innerHeight * 0.92) show(el);
      else io.observe(el);
    });
    return () => {
      io.disconnect();
      timers.forEach((t) => clearTimeout(t));
      root.classList.remove('js-reveal');
    };
  }, []);

  // Cursor spotlight: cards marked data-spotlight get a soft light that follows the pointer
  useEffect(() => {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let last: HTMLElement | null = null;
    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>('[data-spotlight]') ?? null;
      if (last && last !== el) last.style.removeProperty('--spot');
      last = el;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
      el.style.setProperty('--spot', '1');
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    return () => document.removeEventListener('pointermove', onMove);
  }, []);

  const ui = useMemo(
    () => ({ filter, setFilter, toast, openPalette }),
    [filter, toast, openPalette]
  );

  return (
    <Ctx.Provider value={ui}>
      <div className="page" data-filter={filter ?? undefined}>
        {children}
      </div>
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <div className={`toast ${message ? 'toast-on' : ''}`} role="status" aria-live="polite">
        {message}
      </div>
    </Ctx.Provider>
  );
}
