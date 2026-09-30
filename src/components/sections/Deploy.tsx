import { PipelineFigure } from '@/components/figures/Figures';
import styles from './sections.module.css';

const SPEC = [
  { k: 'Hosting', v: 'Vercel for Next.js and serverless Express, AWS Amplify and S3, Netlify' },
  {
    k: 'Domains',
    v: 'DNS management, including moving a live business off WordPress hosting with zero downtime',
  },
  { k: 'Jobs', v: 'Scheduled work on Vercel Cron, with a node-cron path for always-on servers' },
  { k: 'CI', v: 'Basic pipelines with GitHub Actions' },
  { k: 'Config', v: 'Environment variables and secrets kept per environment' },
];

export default function Deploy() {
  return (
    <section className="sec" id="ship" aria-labelledby="ship-h">
      <div className="split rev">
        <PipelineFigure />
        <div className={styles.spec} data-reveal>
          <div className="intro">
            <p className="eyebrow">Deployment</p>
            <h2 className="h2" id="ship-h">
              I ship to production myself.
            </h2>
            <p>
              Every change goes through the same path: checks, a preview you can click, then
              production. Push a commit to send one through.
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
        </div>
      </div>
    </section>
  );
}
