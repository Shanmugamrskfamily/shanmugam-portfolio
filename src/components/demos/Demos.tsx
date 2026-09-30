'use client';

import { useRef, useState } from 'react';
import OfferDemo from './OfferDemo';
import SurveyDemo from './SurveyDemo';
import styles from './demos.module.css';

const TABS = [
  {
    id: 'survey',
    label: 'Resumable survey',
    note: 'Type something, then reload the page: your answers come back. Jump between steps freely; checks run only when you submit. In production the draft saved on the server; here it stays in your browser.',
  },
  {
    id: 'offer',
    label: 'One-offer rule',
    note: 'Rebuilds the hiring rule in the DEET Job Fair module. Before saving an acceptance, the server checks the database for one already on record, so a second acceptance is refused even from another device. I built the job-seeker and admin sides; a senior developer built the employer side.',
  },
] as const;

export default function Demos() {
  const [tab, setTab] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const next = (i + (e.key === 'ArrowRight' ? 1 : TABS.length - 1)) % TABS.length;
    setTab(next);
    refs.current[next]?.focus();
  };

  return (
    <>
      <div className={styles.switch} role="tablist" aria-label="Demos">
        {TABS.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            id={`demo-tab-${t.id}`}
            aria-controls={`demo-panel-${t.id}`}
            aria-selected={tab === i}
            tabIndex={tab === i ? 0 : -1}
            onClick={() => setTab(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {TABS.map((t, i) => (
        <div
          key={t.id}
          className={styles.demo}
          role="tabpanel"
          id={`demo-panel-${t.id}`}
          aria-labelledby={`demo-tab-${t.id}`}
          hidden={tab !== i}
        >
          {t.id === 'survey' ? <SurveyDemo /> : <OfferDemo />}
          <p className={styles.note}>{t.note}</p>
        </div>
      ))}
    </>
  );
}
