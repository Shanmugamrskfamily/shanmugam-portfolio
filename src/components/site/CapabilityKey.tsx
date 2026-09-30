'use client';

import type { Capability } from '@/types';
import { usePageUI } from './PageShell';
import styles from '../sections/sections.module.css';

const KEY: { k: Capability; label: string }[] = [
  { k: 'fe', label: 'Frontend' },
  { k: 'be', label: 'Backend' },
  { k: 'ops', label: 'Deployment' },
  { k: 'seo', label: 'SEO' },
];

/** The colour key doubles as a filter: pick a capability to highlight matching work across the page. */
export default function CapabilityKey({ note }: { note?: string }) {
  const { filter, setFilter } = usePageUI();
  return (
    <div className={styles.keyRow}>
      <div className={styles.key} role="group" aria-label="Highlight work by capability">
        {KEY.map((x) => (
          <button
            key={x.k}
            type="button"
            className={`k-${x.k}`}
            aria-pressed={filter === x.k}
            onClick={() => setFilter(filter === x.k ? null : x.k)}
          >
            {x.label}
          </button>
        ))}
        {filter && (
          <button type="button" className={styles.keyClear} onClick={() => setFilter(null)}>
            Show all
          </button>
        )}
      </div>
      {note && <p className={styles.keyNote}>{note}</p>}
    </div>
  );
}
