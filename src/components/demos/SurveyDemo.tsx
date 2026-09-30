'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './demos.module.css';

/**
 * A small rebuild of the pattern behind the DEET Skill Survey:
 * OTP-verified prefill, free movement between steps, validation only on submit,
 * and autosave so an abandoned form resumes where it was left.
 * In production the draft is kept on the server; here it lives in localStorage.
 */

const KEY = 'portfolio-survey-demo-v1';
const STEPS = ['Identify', 'Education', 'Skills', 'Support', 'Review'];
const SKILLS = [
  'Computer basics',
  'MS Excel',
  'Spoken English',
  'Tally',
  'Driving',
  'Electrical work',
  'Tailoring',
  'Programming',
];
const SUPPORT = ['Skill training', 'Certification', 'Job placement', 'Apprenticeship'];
const DISTRICTS = [
  'Adilabad',
  'Hyderabad',
  'Karimnagar',
  'Khammam',
  'Nalgonda',
  'Nizamabad',
  'Warangal',
];
const QUALS = ['SSC', 'Intermediate', 'ITI', 'Diploma', 'Degree', 'Postgraduate'];

interface Draft {
  step: number;
  mobile: string;
  email: string;
  otp: string;
  code: string;
  sent: boolean;
  verified: boolean;
  noRecord: boolean;
  name: string;
  district: string;
  qual: string;
  year: string;
  skills: string[];
  support: string;
  note: string;
  tried: boolean;
  submitted: boolean;
  savedAt: number;
}

const fresh = (): Draft => ({
  step: 0,
  mobile: '',
  email: '',
  otp: '',
  code: '',
  sent: false,
  verified: false,
  noRecord: false,
  name: '',
  district: '',
  qual: '',
  year: '',
  skills: [],
  support: '',
  note: '',
  tried: false,
  submitted: false,
  savedAt: 0,
});
const FRESH_KEY = JSON.stringify(fresh());

interface Missing {
  step: number;
  id: string;
  msg: string;
}

function missing(d: Draft): Missing[] {
  const m: Missing[] = [];
  if (!(d.verified || d.noRecord))
    m.push({
      step: 0,
      id: 'sv-mobile',
      msg: 'Verify your mobile number, or continue without a record.',
    });
  else {
    if (!d.name.trim()) m.push({ step: 0, id: 'sv-name', msg: 'Add your full name.' });
    if (!d.district) m.push({ step: 0, id: 'sv-district', msg: 'Choose your district.' });
  }
  if (!d.qual) m.push({ step: 1, id: 'sv-qual', msg: 'Choose your highest qualification.' });
  if (!/^(19[6-9]\d|20[0-2]\d)$/.test(d.year))
    m.push({ step: 1, id: 'sv-year', msg: 'Add your year of passing, for example 2021.' });
  if (!d.skills.length)
    m.push({ step: 2, id: 'sv-skill-0', msg: 'Pick at least one skill you have now.' });
  if (!d.support) m.push({ step: 3, id: 'sv-support-0', msg: 'Choose the support you want.' });
  return m;
}

function ago(ms: number) {
  const s = Math.round(ms / 1000);
  if (s < 10) return 'just now';
  if (s < 60) return `${s} seconds ago`;
  const m = Math.round(s / 60);
  if (m < 60) return `${m} minute${m === 1 ? '' : 's'} ago`;
  const h = Math.round(m / 60);
  return `${h} hour${h === 1 ? '' : 's'} ago`;
}

export default function SurveyDemo() {
  const [d, setD] = useState<Draft>(fresh);
  const [banner, setBanner] = useState('');
  const [idErr, setIdErr] = useState('');
  const [saving, setSaving] = useState(false);
  const [, tick] = useState(0);
  const focusNext = useRef<string | null>(null);

  // Restore a saved draft once, on the client
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const saved = { ...fresh(), ...(JSON.parse(raw) as Partial<Draft>) };
        setD(saved);
        if (saved.savedAt)
          setBanner(`Restored the answers you left ${ago(Date.now() - saved.savedAt)}.`);
      }
    } catch {
      /* storage blocked: start fresh */
    }
    const id = window.setInterval(() => tick((n) => n + 1), 15000);
    return () => clearInterval(id);
  }, []);

  // Autosave, debounced. The key ignores savedAt so recording a save doesn't trigger another.
  const draftKey = JSON.stringify({ ...d, savedAt: 0 });
  useEffect(() => {
    if (draftKey === FRESH_KEY) return;
    setSaving(true);
    const t = window.setTimeout(() => {
      const savedAt = Date.now();
      try {
        localStorage.setItem(KEY, JSON.stringify({ ...(JSON.parse(draftKey) as Draft), savedAt }));
        setD((cur) => ({ ...cur, savedAt }));
      } catch {
        /* storage blocked */
      }
      setSaving(false);
    }, 450);
    return () => clearTimeout(t);
  }, [draftKey]);

  useEffect(() => {
    if (!focusNext.current) return;
    const el = document.getElementById(focusNext.current);
    focusNext.current = null;
    if (el && el.offsetParent) el.focus();
  });

  const patch = (p: Partial<Draft>) => setD((cur) => ({ ...cur, ...p, submitted: false }));
  const go = (step: number, focusId?: string) => {
    if (focusId) focusNext.current = focusId;
    setD((cur) => ({ ...cur, step: Math.max(0, Math.min(4, step)) }));
  };

  const m = missing(d);
  const idDone = d.verified || d.noRecord;

  const sendCode = () => {
    const errs: string[] = [];
    if (!/^[6-9]\d{9}$/.test(d.mobile.replace(/\s/g, '')))
      errs.push('Enter a 10-digit mobile number that starts with 6, 7, 8 or 9.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim()))
      errs.push('Enter an email address like name@example.com.');
    setIdErr(errs.join(' '));
    if (errs.length) return;
    focusNext.current = 'sv-otp';
    patch({ sent: true, code: String(Math.floor(100000 + Math.random() * 900000)) });
  };

  const verify = () => {
    if (d.otp.trim() !== d.code) {
      setIdErr('That code does not match the demo SMS. Check it and try again.');
      return;
    }
    setIdErr('');
    const filled: string[] = [];
    const next: Draft = { ...d, verified: true, noRecord: false, submitted: false };
    if (!next.name) {
      next.name = 'Demo Candidate';
      filled.push('name');
    }
    if (!next.district) {
      next.district = 'Warangal';
      filled.push('district');
    }
    if (!next.qual) {
      next.qual = 'Diploma';
      filled.push('qualification');
    }
    setBanner(
      filled.length
        ? `Found a record for this mobile and email. We filled in your ${filled.join(', ')} and took you to the first answer still missing.`
        : 'Mobile verified. Your earlier answers are unchanged.'
    );
    const first = missing(next)[0];
    if (first) {
      next.step = first.step;
      focusNext.current = first.id;
    }
    setD(next);
  };

  const clear = () => {
    try {
      localStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
    setD(fresh());
    setSaving(false);
    setBanner('');
    setIdErr('');
  };

  const savedLabel = saving
    ? 'Saving…'
    : d.savedAt
      ? `Saved ${ago(Date.now() - d.savedAt)}`
      : 'Not saved yet';

  return (
    <div>
      <div className={styles.top}>
        <ol className={styles.steps}>
          {STEPS.map((name, i) => (
            <li key={name}>
              <button
                type="button"
                aria-current={i === d.step ? 'step' : undefined}
                className={i < 4 && !m.some((x) => x.step === i) ? styles.done : undefined}
                onClick={() => go(i)}
              >
                <span className={styles.n}>{i + 1}</span>
                {name}
              </button>
            </li>
          ))}
        </ol>
        <span className={styles.saved} aria-live="polite">
          {savedLabel}
        </span>
      </div>
      {banner && <p className={styles.banner}>{banner}</p>}

      <div className={styles.body}>
        {d.step === 0 && (
          <section className={styles.pane}>
            <h4>Find your record</h4>
            <p className={styles.help}>
              Enter the mobile number and email you registered with. We send a code to the mobile
              before showing any saved details.
            </p>
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="sv-mobile">Mobile number</label>
                <input
                  id="sv-mobile"
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="98765 43210"
                  value={d.mobile}
                  onChange={(e) => patch({ mobile: e.target.value })}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="sv-email">Email</label>
                <input
                  id="sv-email"
                  type="email"
                  autoComplete="off"
                  placeholder="name@example.com"
                  value={d.email}
                  onChange={(e) => patch({ email: e.target.value })}
                />
              </div>
            </div>
            {idErr && <p className={styles.err}>{idErr}</p>}
            {!idDone && (
              <div className={styles.actions}>
                <button type="button" className="btn-demo" onClick={sendCode}>
                  Send code
                </button>
                <button
                  type="button"
                  className="btn-link"
                  onClick={() => {
                    focusNext.current = 'sv-name';
                    patch({ noRecord: true, verified: false });
                  }}
                >
                  I&apos;m not registered, continue without a record
                </button>
              </div>
            )}
            {d.sent && !idDone && (
              <div className={styles.stack}>
                <div className={styles.inbox}>
                  <span className={styles.from}>Demo SMS</span>
                  <span>
                    Your code is <b>{d.code}</b>
                  </span>
                </div>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="sv-otp">6-digit code</label>
                    <input
                      id="sv-otp"
                      inputMode="numeric"
                      maxLength={6}
                      autoComplete="one-time-code"
                      value={d.otp}
                      onChange={(e) => patch({ otp: e.target.value })}
                    />
                  </div>
                  <div className={`${styles.field} ${styles.alignEnd}`}>
                    <button type="button" className="btn-demo" onClick={verify}>
                      Verify and continue
                    </button>
                  </div>
                </div>
              </div>
            )}
            {idDone && (
              <div className={styles.stack}>
                {d.verified ? (
                  <p className={styles.verified}>
                    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    Mobile verified
                  </p>
                ) : (
                  <p className={styles.verified}>
                    <span className={styles.plain}>Continuing without a saved record.</span>
                    <button
                      type="button"
                      className="btn-link"
                      onClick={() => {
                        focusNext.current = 'sv-mobile';
                        patch({ noRecord: false });
                      }}
                    >
                      Verify instead
                    </button>
                  </p>
                )}
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="sv-name">Full name</label>
                    <input
                      id="sv-name"
                      autoComplete="off"
                      value={d.name}
                      onChange={(e) => patch({ name: e.target.value })}
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="sv-district">District</label>
                    <select
                      id="sv-district"
                      value={d.district}
                      onChange={(e) => patch({ district: e.target.value })}
                    >
                      <option value="">Choose a district</option>
                      {DISTRICTS.map((x) => (
                        <option key={x}>{x}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {d.step === 1 && (
          <section className={styles.pane}>
            <h4>Education</h4>
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="sv-qual">Highest qualification</label>
                <select
                  id="sv-qual"
                  value={d.qual}
                  onChange={(e) => patch({ qual: e.target.value })}
                >
                  <option value="">Choose one</option>
                  {QUALS.map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </div>
              <div className={styles.field}>
                <label htmlFor="sv-year">Year of passing</label>
                <input
                  id="sv-year"
                  inputMode="numeric"
                  maxLength={4}
                  placeholder="2021"
                  value={d.year}
                  onChange={(e) => patch({ year: e.target.value })}
                />
              </div>
            </div>
          </section>
        )}

        {d.step === 2 && (
          <section className={styles.pane}>
            <h4>Skills you have now</h4>
            <p className={styles.help}>Pick all that apply.</p>
            <div className={styles.checks}>
              {SKILLS.map((s, i) => (
                <label key={s} className={styles.check}>
                  <input
                    type="checkbox"
                    id={`sv-skill-${i}`}
                    checked={d.skills.includes(s)}
                    onChange={(e) =>
                      patch({
                        skills: e.target.checked
                          ? [...d.skills, s]
                          : d.skills.filter((x) => x !== s),
                      })
                    }
                  />
                  {s}
                </label>
              ))}
            </div>
          </section>
        )}

        {d.step === 3 && (
          <section className={styles.pane}>
            <h4>Support you want</h4>
            <div className={styles.checks}>
              {SUPPORT.map((s, i) => (
                <label key={s} className={styles.check}>
                  <input
                    type="radio"
                    name="sv-support"
                    id={`sv-support-${i}`}
                    checked={d.support === s}
                    onChange={() => patch({ support: s })}
                  />
                  {s}
                </label>
              ))}
            </div>
            <div className={styles.field}>
              <label htmlFor="sv-note">
                Anything else? <span className={styles.optional}>(optional)</span>
              </label>
              <textarea
                id="sv-note"
                value={d.note}
                onChange={(e) => patch({ note: e.target.value })}
              />
            </div>
          </section>
        )}

        {d.step === 4 && (
          <section className={styles.pane}>
            <h4>Review and submit</h4>
            <dl className={styles.review}>
              <dt>Mobile</dt>
              <dd>
                {d.verified
                  ? `${d.mobile} (verified)`
                  : d.noRecord
                    ? 'Not registered'
                    : 'Not verified'}
              </dd>
              <dt>Name</dt>
              <dd>{d.name || '—'}</dd>
              <dt>District</dt>
              <dd>{d.district || '—'}</dd>
              <dt>Qualification</dt>
              <dd>{d.qual ? `${d.qual}${d.year ? `, ${d.year}` : ''}` : '—'}</dd>
              <dt>Skills</dt>
              <dd>{d.skills.join(', ') || '—'}</dd>
              <dt>Support</dt>
              <dd>{d.support || '—'}</dd>
            </dl>
            {d.submitted ? (
              <p className={styles.okMsg}>
                Submitted. In production this also cleared the saved draft.
              </p>
            ) : d.tried && m.length ? (
              <ul className={styles.missing}>
                {m.map((x) => (
                  <li key={x.id}>
                    <button type="button" onClick={() => go(x.step, x.id)}>
                      Step {x.step + 1}: {x.msg}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
            <div className={styles.actions}>
              <button
                type="button"
                className="btn-demo"
                onClick={() =>
                  setD((cur) => ({ ...cur, tried: true, submitted: missing(cur).length === 0 }))
                }
              >
                Submit survey
              </button>
              <button type="button" className="btn-link" onClick={clear}>
                Clear demo data
              </button>
            </div>
          </section>
        )}
      </div>

      <div className={styles.nav}>
        <button
          type="button"
          className="btn-ghost"
          onClick={() => go(d.step - 1)}
          disabled={d.step === 0}
        >
          Back
        </button>
        {d.step < 4 && (
          <button type="button" className="btn-demo" onClick={() => go(d.step + 1)}>
            {d.step === 3 ? 'Review answers' : 'Next'}
          </button>
        )}
      </div>
    </div>
  );
}
