import CapabilityKey from '@/components/site/CapabilityKey';
import LogoPlate from '@/components/ui/LogoPlate';
import { caseStudies, parts } from '@/data/portfolio';
import type { Capability } from '@/types';
import styles from './sections.module.css';

const CAP_LABEL: Record<Capability, string> = {
  fe: 'Frontend',
  be: 'Backend',
  ops: 'Deployment',
  seo: 'SEO',
};

export default function Work() {
  return (
    <section className="sec" id="work" aria-labelledby="work-h">
      <div className="intro" data-reveal>
        <p className="eyebrow">Work</p>
        <h2 className="h2" id="work-h">
          Parts list
        </h2>
        <p>
          Everything here is live or delivered, except the last item, which is an assessment project
          and labelled as one. Pick a row to read its case study.
        </p>
      </div>
      <CapabilityKey />

      <div className={styles.scroll} data-reveal>
        <table className={styles.bom}>
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Part</th>
              <th scope="col">Built with</th>
              <th scope="col">My scope</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {parts.map((p) => (
              <tr key={p.item} data-caps={p.capabilities.join(' ')}>
                <td className={styles.n}>{p.item}</td>
                <td>
                  <a className={styles.partLink} href={`#c-${p.caseId}`}>
                    {p.name}
                  </a>
                  <br />
                  {p.href ? (
                    <a href={p.href} target="_blank" rel="noopener noreferrer">
                      {p.context}
                    </a>
                  ) : (
                    p.context
                  )}
                </td>
                <td>{p.builtWith}</td>
                <td>{p.scope}</td>
                <td className={styles.st}>{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.cases} data-reveal data-stagger>
        {caseStudies.map((c) => (
          <article
            key={c.id}
            id={`c-${c.id}`}
            className={`${styles.case} ${c.featured ? styles.featured : ''}`}
            aria-labelledby={`case-${c.id}`}
            data-caps={c.capabilities.join(' ')}
            data-spotlight
          >
            <div className={styles.caseTop}>
              <div className={styles.caseId}>
                {c.logo && <LogoPlate logo={c.logo} className={styles.caseLogo} sizes="64px" />}
                <h3 id={`case-${c.id}`}>{c.title}</h3>
              </div>
              {c.badge ? (
                <span className="pill">{c.badge}</span>
              ) : (
                <span className={styles.item}>{c.items}</span>
              )}
            </div>
            <p className={styles.role}>{c.role}</p>
            <p className={styles.tags}>
              {c.capabilities.map((k) => (
                <span key={k} className={`tag k-${k}`}>
                  {CAP_LABEL[k]}
                </span>
              ))}
            </p>
            <dl>
              {c.problem && (
                <>
                  <dt>Problem</dt>
                  <dd>{c.problem}</dd>
                </>
              )}
              <dt>Built</dt>
              <dd>
                {c.built.length > 1 ? (
                  <ul>
                    {c.built.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                ) : (
                  c.built[0]
                )}
              </dd>
              <dt>{c.outcome.label}</dt>
              <dd>{c.outcome.text}</dd>
            </dl>
            <p className={styles.linksRow}>
              {c.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  {...(l.href.startsWith('http')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  {l.label}
                </a>
              ))}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
