import CopyButton from '@/components/ui/CopyButton';
import { openToWork, person } from '@/data/portfolio';
import styles from './sections.module.css';

export default function Contact() {
  const chips = [openToWork.employmentType, ...openToWork.locations, 'Remote', openToWork.notice];
  return (
    <section className="sec" id="contact" aria-labelledby="contact-h">
      <div className={styles.contact} data-reveal>
        <div className={styles.contactHead}>
          <p className="eyebrow">Contact</p>
          <h2 className={styles.big} id="contact-h">
            Hiring for React, Next.js or full stack? Let&apos;s talk.
          </h2>
          <p className={styles.chips}>
            <span className={styles.open}>Open to work</span>
            {chips.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </p>
          <div className={styles.btns}>
            <a
              className="btn btn-solid"
              href={person.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open résumé (PDF)
            </a>
            <a
              className="btn btn-line"
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="btn btn-line"
              href={person.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              className="btn btn-line"
              href={person.hackerrank}
              target="_blank"
              rel="noopener noreferrer"
            >
              HackerRank
            </a>
          </div>
          <p className={styles.keyNote}>
            Tip: press <kbd>Ctrl</kbd> <kbd>K</kbd> anywhere to jump around or copy my details.
          </p>
        </div>
        <div className={styles.reach}>
          <div>
            <small>Email</small>
            <a className={styles.v} href={`mailto:${person.email}`}>
              {person.email}
            </a>
            <CopyButton text={person.email} what="Email" className={styles.copy} />
          </div>
          <div>
            <small>Phone</small>
            <a className={styles.v} href={`tel:${person.phone.replace(/\s/g, '')}`}>
              {person.phone}
            </a>
            <CopyButton text={person.phone} what="Phone number" className={styles.copy} />
          </div>
          <div>
            <small>Based in</small>
            <span className={styles.v}>{person.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
