'use client';

import { useEffect, useRef, useState } from 'react';
import { pipelineStages, stackLayers, treeLevels } from '@/data/portfolio';
import { FigureFrame, useFigure } from './FigureFrame';
import { PipelineStill, StackStill, TreeStill } from './Stills';
import { useCoarsePointer } from './useFigureMode';
import styles from './figure.module.css';

/* ---------- Fig. 1 · exploded stack (the one figure that also runs live on phones) ---------- */
export function StackFigure() {
  const { store, snap, mode } = useFigure({ yaw: 0.72, pitch: 0.44 }, true);
  const coarse = useCoarsePointer();
  const [sep, setSep] = useState(0);
  const touched = useRef(false);
  const holder = useRef<HTMLDivElement>(null);
  const active = snap.hi >= 0 ? snap.hi : snap.hover;

  useEffect(() => {
    store.live.sep = sep / 100;
  }, [sep, store]);

  // Explode once, the first time the drawing scrolls into view
  useEffect(() => {
    const el = holder.current;
    if (!el || mode !== '3d') return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now() + 300;
        const step = (now: number) => {
          if (touched.current) return;
          const k = Math.max(0, Math.min(1, (now - t0) / 1500));
          setSep(Math.round((1 - Math.pow(1 - k, 3)) * 100));
          if (k < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [mode]);

  return (
    <div ref={holder}>
      <FigureFrame
        store={store}
        mode={mode}
        kind="stack"
        label="Exploded drawing of the five layers of the rstechnologies.in platform"
        balloons={5}
        pitchRange={[0.12, 0.95]}
        still={<StackStill active={active} />}
        controls={
          mode === '3d' ? (
            <div className={styles.controls}>
              <label className={styles.range} htmlFor="stack-sep">
                Assembled
                <input
                  id="stack-sep"
                  type="range"
                  aria-label="Explode the drawing"
                  min={0}
                  max={100}
                  value={sep}
                  onChange={(e) => {
                    touched.current = true;
                    setSep(Number(e.target.value));
                  }}
                />
                Exploded
              </label>
              <span className={styles.hint}>
                {coarse ? 'Tap the drawing, then drag to turn' : 'Drag to turn · hover a layer'}
              </span>
            </div>
          ) : null
        }
        legend={stackLayers}
        caption="Fig. 1 · rstechnologies.in, exploded · built solo, Jun–Jul 2026"
      />
    </div>
  );
}

/* ---------- Fig. 2 · release pipeline ---------- */
const STAGE_NAMES = ['Committed', 'Running checks', 'Preview deployed', 'Live in production'];
const STEP_MS = 1300;

export function PipelineFigure() {
  const { store, snap, mode } = useFigure({ yaw: 0.35, pitch: 0.55 });
  const [busy, setBusy] = useState(false);
  const timers = useRef<number[]>([]);
  const stage = snap.stage;

  useEffect(() => () => timers.current.forEach((t) => clearTimeout(t)), []);

  // Re-enable the button once a commit reaches production
  useEffect(() => {
    if (!busy || stage !== 3) return;
    const t = window.setTimeout(() => setBusy(false), 1200);
    return () => clearTimeout(t);
  }, [busy, stage]);

  const push = () => {
    setBusy(true);
    if (mode === '3d') {
      store.live.pushAt = performance.now();
      return;
    }
    // Still drawing: step the readout without animation
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [0, 1, 2, 3].map((i) =>
      window.setTimeout(() => store.set({ stage: i }), i * STEP_MS)
    );
    timers.current.push(window.setTimeout(() => store.set({ stage: -1 }), 4 * STEP_MS + 2500));
  };

  return (
    <FigureFrame
      store={store}
      mode={mode}
      kind="pipeline"
      wide
      label="Schematic of a change moving from commit through checks and preview to production"
      balloons={4}
      pitchRange={[0.2, 1.1]}
      still={<PipelineStill active={snap.hi} lit={stage} />}
      controls={
        <>
          <div className={styles.actions}>
            <button type="button" className="btn-demo" onClick={push} disabled={busy}>
              Push a commit
            </button>
            <span className={styles.hint}>
              {mode === '3d' ? 'Schematic · drag to turn' : 'Schematic'}
            </span>
          </div>
          <div className={styles.readout} aria-live="polite">
            <div>
              <small>Your commit</small>
              <span className={stage >= 0 && stage < 3 ? styles.moving : undefined}>
                {stage < 0 ? 'Waiting for a push' : STAGE_NAMES[stage]}
              </span>
            </div>
            <div>
              <small>Checks</small>
              <span>{stage < 1 ? '—' : stage === 1 ? 'Running' : 'Passed'}</span>
            </div>
            <div>
              <small>Production</small>
              <span className={styles.good}>Live</span>
            </div>
          </div>
        </>
      }
      legend={pipelineStages}
      caption="Fig. 2 · how a change reaches production · schematic"
    />
  );
}

/* ---------- Fig. 3 · generated page tree ---------- */
export function TreeFigure() {
  const { store, snap, mode } = useFigure({ yaw: 0.3, pitch: 0.5 });
  return (
    <FigureFrame
      store={store}
      mode={mode}
      kind="tree"
      label="Schematic tree of the rstechnologies.in catalogue: 6 category, 40 sub-category and 200 product pages"
      balloons={0}
      pitchRange={[0.15, 1.2]}
      still={<TreeStill active={snap.hi} />}
      controls={
        mode === '3d' ? (
          <span className={styles.hint}>Drag to turn · hover a level below</span>
        ) : null
      }
      legend={treeLevels}
      caption="Fig. 3 · the rstechnologies.in catalogue as generated pages · schematic, not to scale"
    />
  );
}
