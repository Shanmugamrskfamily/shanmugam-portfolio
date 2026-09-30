import CapabilityKey from '@/components/site/CapabilityKey';
import LogoPlate from '@/components/ui/LogoPlate';
import { capabilities, shippedFor } from '@/data/portfolio';
import styles from './sections.module.css';

export default function Capabilities() {
  return (
    <section className="sec" aria-labelledby="caps-h">
      <div className={styles.shipped} data-reveal>
        <p className={styles.label}>Products I&apos;ve built for</p>
        <div className={styles.logos} data-reveal data-stagger>
          {shippedFor.map((s) => (
            <a
              key={s.name}
              className={styles.logo}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              data-spotlight
            >
              <LogoPlate logo={s.logo} className={styles.logoPlate} sizes="96px" />
              <span>
                <b>{s.name}</b>
                <small>{s.note}</small>
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="intro" data-reveal>
        <p className="eyebrow">What I bring</p>
        <h2 className="h2" id="caps-h">
          Frontend depth, with the rest of the stack covered.
        </h2>
      </div>
      <CapabilityKey note="Each colour is a capability. Pick one to highlight that work across the page." />
      <div className={styles.caps} data-reveal data-stagger>
        {capabilities.map((c) => (
          <div key={c.key} className={`${styles.cap} k-${c.key}`} data-caps={c.key} data-spotlight>
            <h3>{c.name}</h3>
            <p>{c.summary}</p>
            <p className={styles.proof}>{c.proof}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
