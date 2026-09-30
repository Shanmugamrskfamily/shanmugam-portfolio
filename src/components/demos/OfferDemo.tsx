'use client';

import { useState } from 'react';
import styles from './demos.module.css';

/**
 * Rebuilds the hiring rule from the DEET Job Fair module: a job seeker can apply
 * everywhere in a fair but accept only one offer. Before saving an acceptance the
 * server checks the database for one already on record.
 */

type Status = 'applied' | 'offered' | 'hired' | 'closed';
interface Employer {
  id: string;
  name: string;
  job: string;
  status: Status;
}
interface State {
  employers: Employer[];
  hired: string | null;
  log: { t: string; m: string }[];
}

const CHIP: Record<Status, string> = {
  applied: 'Applied',
  offered: 'Offer received',
  hired: 'Hired',
  closed: 'Closed',
};
const chipClass: Record<Status, string> = {
  applied: '',
  offered: styles.chipOffered,
  hired: styles.chipHired,
  closed: styles.chipClosed,
};

const time = () =>
  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

// The opening entries carry no clock time, so server and browser render the same markup
const fresh = (): State => ({
  employers: [
    { id: 'l', name: 'Logistics employer', job: 'Warehouse supervisor', status: 'applied' },
    { id: 'r', name: 'Retail employer', job: 'Store associate', status: 'applied' },
    { id: 'i', name: 'IT services employer', job: 'Support engineer', status: 'applied' },
  ],
  hired: null,
  log: [
    { t: 'Before the demo', m: 'You applied to 3 jobs at the fair.' },
    {
      t: 'Before the demo',
      m: 'Admin published the job fair to candidates in your district with your qualification.',
    },
  ],
});

export default function OfferDemo() {
  const [s, setS] = useState<State>(fresh);

  const offer = (id: string) =>
    setS((cur) => {
      const e = cur.employers.find((x) => x.id === id);
      if (!e || e.status !== 'applied' || cur.hired) return cur;
      return {
        ...cur,
        employers: cur.employers.map((x): Employer =>
          x.id === id ? { ...x, status: 'offered' } : x
        ),
        log: [{ t: time(), m: `${e.name} sent you an offer letter.` }, ...cur.log],
      };
    });

  const accept = (id: string) =>
    setS((cur) => {
      const e = cur.employers.find((x) => x.id === id);
      if (!e || e.status !== 'offered' || cur.hired) return cur;
      return {
        employers: cur.employers.map((x): Employer => ({
          ...x,
          status: x.id === id ? 'hired' : 'closed',
        })),
        hired: id,
        log: [
          {
            t: time(),
            m: `Server checked the database: no earlier acceptance. Saved your acceptance of ${e.name}'s offer. Your ${cur.employers.length - 1} other applications closed.`,
          },
          ...cur.log,
        ],
      };
    });

  const acceptAgain = () =>
    setS((cur) => {
      const e = cur.employers.find((x) => x.id === cur.hired);
      if (!e) return cur;
      return {
        ...cur,
        log: [
          {
            t: time(),
            m: `Refused by the server: the database already has an accepted offer from ${e.name} on record.`,
          },
          ...cur.log,
        ],
      };
    });

  return (
    <div className={styles.offer}>
      <div className={styles.main}>
        <h4>A job seeker can interview everywhere, but join only one company.</h4>
        <p className={styles.help}>
          Play both sides. Send offers as the employers, then accept one as the candidate and watch
          the other applications close.
        </p>
        <div className={styles.cards}>
          {s.employers.map((e) => (
            <div
              key={e.id}
              className={`${styles.emp} ${e.status === 'hired' ? styles.hired : ''} ${e.status === 'closed' ? styles.closed : ''}`}
            >
              <div>
                <h5>{e.name}</h5>
                <p className={styles.job}>{e.job}</p>
              </div>
              <span className={`${styles.chip} ${chipClass[e.status]}`}>{CHIP[e.status]}</span>
              <button
                type="button"
                className="btn-ghost"
                disabled={e.status !== 'applied' || !!s.hired}
                onClick={() => offer(e.id)}
              >
                Employer: send offer
              </button>
              <button
                type="button"
                className="btn-demo"
                disabled={e.status !== 'offered' || !!s.hired}
                onClick={() => accept(e.id)}
              >
                You: accept offer
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.log}>
        <h4>Activity</h4>
        <ol aria-live="polite">
          {s.log.map((l, i) => (
            <li key={s.log.length - i}>
              <time>{l.t}</time>
              <span>{l.m}</span>
            </li>
          ))}
        </ol>
        <button type="button" className="btn-ghost" disabled={!s.hired} onClick={acceptAgain}>
          Accept again from another device
        </button>
        <button type="button" className="btn-ghost" onClick={() => setS(fresh())}>
          Start over
        </button>
      </div>
    </div>
  );
}
