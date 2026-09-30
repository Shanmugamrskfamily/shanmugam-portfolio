import Image from 'next/image';
import LogoPlate from '@/components/ui/LogoPlate';
import { certifications, education, person, roles, skills } from '@/data/portfolio';
import styles from './sections.module.css';

export default function About() {
  return (
    <section className="sec" id="about" aria-labelledby="about-h">
      <div className={styles.about}>
        <div className={styles.aboutText} data-reveal>
          <p className="eyebrow">About</p>
          <h2 className="h2" id="about-h">
            Frontend-first, and happy owning the whole thing.
          </h2>
          <div className={styles.portrait}>
            <div className={styles.photo}>
              <Image
                src={person.photo.src}
                alt={person.photo.alt}
                width={person.photo.width}
                height={person.photo.height}
                sizes="112px"
              />
            </div>
            <div>
              <strong>{person.name}</strong>
              <small>
                {person.role} · {person.location}
              </small>
            </div>
          </div>
          <p>
            I&apos;m a full-stack developer in Chennai. Most of my work lives in React and Next.js,
            and I like owning a feature all the way from the first conversation with the people
            who&apos;ll use it to the moment it goes live.
          </p>
          <p>
            On DEET I gathered requirements directly from government officers and specified the API
            the backend team built against. On RS Technologies I was the only developer, so every
            decision was mine.{' '}
            <b>
              Before software I spent six years in manufacturing, which is where I learned to own a
              process end to end.
            </b>
          </p>
        </div>
        <ol className={styles.tl} aria-label="Experience" data-reveal data-stagger>
          {roles.map((r) => (
            <li key={r.company}>
              <LogoPlate logo={r.logo} className={styles.tlLogo} sizes="44px" />
              <b>
                {r.company} · {r.title}
              </b>
              <span className={styles.who}>{r.place}</span>
              <time>{r.dates}</time>
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.skills} aria-label="Skills" data-reveal data-stagger>
        {skills.map((g) => (
          <div
            key={g.name}
            className={`${styles.group} ${g.capability ? `k-${g.capability}` : ''}`}
            data-caps={g.capability ?? 'none'}
            data-spotlight
          >
            <h4>{g.name}</h4>
            <p>{g.skills.join(', ')}</p>
          </div>
        ))}
      </div>

      <div
        className={styles.creds}
        aria-label="Education and certifications"
        data-reveal
        data-stagger
      >
        {[...education, ...certifications].map((c) => (
          <div key={c.name} className={styles.cred}>
            {c.logo && <LogoPlate logo={c.logo} className={styles.credLogo} sizes="40px" />}
            <div>
              <b>{c.name}</b>
              <span>{c.detail}</span>
              {c.href && (
                <a href={c.href} target="_blank" rel="noopener noreferrer">
                  {c.linkLabel ?? 'View'}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
