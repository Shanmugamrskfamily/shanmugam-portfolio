import { StackFigure } from '@/components/figures/Figures';
import { openToWork, stats } from '@/data/portfolio';
import styles from './sections.module.css';

export default function Hero() {
  return (
    <section className={`sec ${styles.hero}`} id="top" aria-labelledby="hero-h">
      <div className="split">
        <div className={styles.heroCopy}>
          <p className="eyebrow">Full-stack developer · frontend-first · Chennai</p>
          <h1 id="hero-h">
            I <span className={`${styles.w} k-fe`}>build</span> it,{' '}
            <span className={`${styles.w} k-ops`}>ship</span> it, and make sure it gets{' '}
            <span className={`${styles.w} k-seo`}>found</span>.
          </h1>
          <p className={styles.lead}>
            React and Next.js up front, Node.js and MongoDB behind, and{' '}
            <b>deployment and SEO handled by me, not handed off</b>. Two and a half years building
            for a state government, a B2B SaaS product and a business I built alone.
          </p>
          <div className={styles.btns}>
            <a className="btn btn-solid" href="#work">
              See the work
            </a>
            <a className="btn btn-line" href="#demos">
              Try a live demo
            </a>
          </div>
          <p className={styles.facts}>
            {stats.map((s, i) => (
              <span key={s.label}>
                {i > 0 && ' · '}
                <b>{s.value}</b> {s.label}
              </span>
            ))}
          </p>
          <p className={styles.status}>
            <span className={styles.lamp} aria-hidden="true" />
            <span>
              Open to {openToWork.employmentType.toLowerCase()} roles in{' '}
              {openToWork.locations.slice(0, -1).join(', ')} or {openToWork.locations.at(-1)}, or
              remote. {openToWork.notice}.
            </span>
          </p>
        </div>
        <StackFigure />
      </div>
    </section>
  );
}
