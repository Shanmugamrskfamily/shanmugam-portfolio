import { posts } from '@/data/portfolio';
import styles from './sections.module.css';

export default function Writing() {
  return (
    <section className="sec" id="writing" aria-labelledby="writing-h">
      <div className="intro" data-reveal>
        <p className="eyebrow">Writing</p>
        <h2 className="h2" id="writing-h">
          Notes from the work
        </h2>
      </div>
      <div className={styles.posts} data-reveal data-stagger>
        {posts.map((p) => (
          <a
            key={p.href}
            className={styles.post}
            data-spotlight
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="pill">LinkedIn</span>
            <h3>{p.title}</h3>
            <p>{p.summary}</p>
            <span className={styles.more}>Read on LinkedIn</span>
          </a>
        ))}
      </div>
    </section>
  );
}
