import { TreeFigure } from '@/components/figures/Figures';
import styles from './sections.module.css';

const SPEC = [
  {
    k: 'Pages',
    v: '6 categories, 40+ sub-categories and 200+ products, generated with generateStaticParams',
  },
  {
    k: 'Structured data',
    v: 'JSON-LD for the organisation, local business, products, blog posts and FAQs',
  },
  { k: 'Crawlers', v: 'Sitemap, plus a robots.txt that explicitly lets AI crawlers read the site' },
  { k: 'Consoles', v: 'Google Search Console and Bing Webmaster Tools set up and verified' },
  {
    k: 'Local',
    v: 'Fixed a founding-year mismatch between Justdial, the site and company records',
  },
];

export default function Seo() {
  return (
    <section className="sec" id="found" aria-labelledby="found-h">
      <div className="split">
        <div className={styles.spec} data-reveal>
          <div className="intro">
            <p className="eyebrow">SEO</p>
            <h2 className="h2" id="found-h">
              Built to be found, from the first commit.
            </h2>
            <p>
              One product data source becomes more than 260 static pages, each with its own metadata
              and structured data. Search engines and AI assistants get clear rules about what they
              can read.
            </p>
          </div>
          <ul>
            {SPEC.map((s) => (
              <li key={s.k}>
                <b>{s.k}</b>
                <span>{s.v}</span>
              </li>
            ))}
          </ul>
          <pre className={styles.code} aria-label="Simplified robots.txt rules">
            <span className={styles.c}># robots.txt, simplified</span>
            {'\n'}
            <span className={styles.kw}>User-agent:</span> GPTBot{'\n'}
            <span className={styles.kw}>Allow:</span> /{'\n'}
            <span className={styles.kw}>User-agent:</span> Google-Extended{'\n'}
            <span className={styles.kw}>Allow:</span> /{'\n'}
            <span className={styles.kw}>User-agent:</span> anthropic-ai{'\n'}
            <span className={styles.kw}>Allow:</span> /
          </pre>
        </div>
        <TreeFigure />
      </div>
    </section>
  );
}
