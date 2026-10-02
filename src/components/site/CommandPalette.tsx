'use client';

import { useTheme } from 'next-themes';
import { useEffect, useMemo, useRef, useState } from 'react';
import { caseStudies, navItems, person, RESUME_VIEW_URL } from '@/data/portfolio';
import type { Capability } from '@/types';
import { usePageUI } from './PageShell';
import styles from './palette.module.css';

interface Command {
  id: string;
  group: 'Jump to' | 'Projects' | 'Actions' | 'Filter work';
  label: string;
  hint?: string;
  keywords?: string;
  run: () => void;
}

const FILTERS: { k: Capability; label: string }[] = [
  { k: 'fe', label: 'Frontend' },
  { k: 'be', label: 'Backend' },
  { k: 'ops', label: 'Deployment' },
  { k: 'seo', label: 'SEO' },
];

const jump = (hash: string) => {
  const el = document.querySelector(hash);
  if (!el) return;
  el.scrollIntoView({
    behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    block: 'start',
  });
  history.replaceState(null, '', hash);
};
const open = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');

/** Every item must match all typed words, in label or keywords. */
function matches(c: Command, q: string) {
  const hay = `${c.label} ${c.keywords ?? ''} ${c.group}`.toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((w) => hay.includes(w));
}

export default function CommandPalette({
  open: isOpen,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { setFilter, toast } = usePageUI();
  const { resolvedTheme, setTheme } = useTheme();
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const commands = useMemo<Command[]>(() => {
    const copy = (text: string, what: string) => () =>
      navigator.clipboard.writeText(text).then(
        () => toast(`${what} copied`),
        () => toast(`Couldn't copy. ${what}: ${text}`)
      );
    return [
      ...navItems.map((n) => ({
        id: `nav-${n.href}`,
        group: 'Jump to' as const,
        label: n.label,
        run: () => jump(n.href),
      })),
      ...caseStudies.map((c) => ({
        id: `case-${c.id}`,
        group: 'Projects' as const,
        label: c.title,
        hint: c.badge ?? c.role.split(' · ')[0],
        keywords: c.built.join(' '),
        run: () => jump(`#c-${c.id}`),
      })),
      {
        id: 'resume',
        group: 'Actions',
        label: 'Open résumé (PDF)',
        keywords: 'cv download',
        run: () => open(RESUME_VIEW_URL),
      },
      {
        id: 'email',
        group: 'Actions',
        label: 'Copy email address',
        hint: person.email,
        keywords: 'mail contact',
        run: copy(person.email, 'Email'),
      },
      {
        id: 'phone',
        group: 'Actions',
        label: 'Copy phone number',
        hint: person.phone,
        keywords: 'call contact',
        run: copy(person.phone, 'Phone number'),
      },
      {
        id: 'linkedin',
        group: 'Actions',
        label: 'Open LinkedIn',
        run: () => open(person.linkedin),
      },
      {
        id: 'github',
        group: 'Actions',
        label: 'Open GitHub',
        keywords: 'code repos',
        run: () => open(person.github),
      },
      {
        id: 'hackerrank',
        group: 'Actions',
        label: 'Open HackerRank profile',
        keywords: 'badge problem solving',
        run: () => open(person.hackerrank),
      },
      {
        id: 'theme',
        group: 'Actions',
        label:
          resolvedTheme === 'dark'
            ? 'Switch to drafting (light) mode'
            : 'Switch to blueprint (dark) mode',
        keywords: 'theme dark light',
        run: () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark'),
      },
      ...FILTERS.map((f) => ({
        id: `filter-${f.k}`,
        group: 'Filter work' as const,
        label: `Show ${f.label} work`,
        keywords: 'highlight capability',
        run: () => {
          setFilter(f.k);
          jump('#work');
        },
      })),
      {
        id: 'filter-none',
        group: 'Filter work',
        label: 'Show all work',
        keywords: 'clear reset',
        run: () => setFilter(null),
      },
    ];
  }, [resolvedTheme, setFilter, setTheme, toast]);

  const results = useMemo(() => commands.filter((c) => matches(c, q)), [commands, q]);

  useEffect(() => {
    if (!isOpen) return;
    returnFocus.current = document.activeElement as HTMLElement | null;
    setQ('');
    setActive(0);
    const t = window.setTimeout(() => input.current?.focus(), 0);
    document.body.style.overflow = 'hidden';
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = '';
      returnFocus.current?.focus?.({ preventScroll: true });
    };
  }, [isOpen]);

  useEffect(() => setActive(0), [q]);
  useEffect(() => {
    list.current?.querySelector(`[data-i="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  if (!isOpen) return null;

  const run = (c: Command | undefined) => {
    if (!c) return;
    onClose();
    // Let the dialog close and focus return before acting
    window.setTimeout(c.run, 0);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(results.length - 1, a + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      run(results[active]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'Tab') {
      e.preventDefault();
    }
  };

  let lastGroup = '';
  return (
    <div className={styles.backdrop} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onKeyDown={onKey}
      >
        <div className={styles.head}>
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          <input
            ref={input}
            className={styles.input}
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={results[active] ? `pal-${results[active].id}` : undefined}
            aria-autocomplete="list"
            placeholder="Jump to a section, open a project, copy my email…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <kbd className={styles.kbd}>Esc</kbd>
        </div>
        <ul
          ref={list}
          id="palette-list"
          role="listbox"
          className={styles.list}
          aria-label="Commands"
        >
          {results.length === 0 && (
            <li className={styles.empty}>
              Nothing matches “{q}”. Try “resume”, “email” or “deet”.
            </li>
          )}
          {results.map((c, i) => {
            const heading = c.group !== lastGroup;
            lastGroup = c.group;
            return (
              <li key={c.id} role="presentation">
                {heading && <p className={styles.group}>{c.group}</p>}
                <div
                  id={`pal-${c.id}`}
                  role="option"
                  aria-selected={i === active}
                  data-i={i}
                  className={`${styles.item} ${i === active ? styles.itemOn : ''}`}
                  onMouseMove={() => i !== active && setActive(i)}
                  onClick={() => run(c)}
                >
                  <span className={styles.label}>{c.label}</span>
                  {c.hint && <span className={styles.hint}>{c.hint}</span>}
                </div>
              </li>
            );
          })}
        </ul>
        <p className={styles.foot}>
          <span>
            <kbd className={styles.kbd}>↑</kbd> <kbd className={styles.kbd}>↓</kbd> to move
          </span>
          <span>
            <kbd className={styles.kbd}>Enter</kbd> to run
          </span>
        </p>
      </div>
    </div>
  );
}
