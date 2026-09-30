'use client';

import dynamic from 'next/dynamic';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import type { LegendEntry } from '@/types';
import { createFigureStore, type FigureStore } from './store';
import { clamp } from './math';
import { useCoarsePointer, useFigureMode, type FigureMode } from './useFigureMode';
import styles from './figure.module.css';

export type SceneKind = 'stack' | 'pipeline' | 'tree';

const Stage3D = dynamic(() => import('./Stage3D'), { ssr: false });

/** @param onPhone allow live 3D for this figure on capable phones, not only on desktop */
export function useFigure(orbit: { yaw: number; pitch: number }, onPhone = false) {
  const store = useMemo(() => createFigureStore(orbit), []); // eslint-disable-line react-hooks/exhaustive-deps
  const snap = useSyncExternalStore(store.subscribe, store.get, store.get);
  const mode = useFigureMode(onPhone);
  return { store, snap, mode };
}

interface FrameProps {
  store: FigureStore;
  mode: FigureMode;
  kind: SceneKind;
  label: string;
  wide?: boolean;
  balloons: number;
  pitchRange: [number, number];
  still: ReactNode;
  controls?: ReactNode;
  legend: LegendEntry[];
  caption: string;
}

/**
 * A drawing frame: the stage (3D view on desktop, still SVG elsewhere),
 * optional controls, a numbered legend and a figure caption.
 */
export function FigureFrame({
  store,
  mode,
  kind,
  label,
  wide,
  balloons,
  pitchRange,
  still,
  controls,
  legend,
  caption,
}: FrameProps) {
  const snap = useSyncExternalStore(store.subscribe, store.get, store.get);
  const stageRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, x: 0, y: 0 });
  const live3d = mode === '3d';
  const active = snap.hi >= 0 ? snap.hi : snap.hover;
  // On touch screens the figure must be tapped before a drag turns it, so swipes keep scrolling the page
  const coarse = useCoarsePointer();
  const needsArm = live3d && coarse;
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    store.live.stage = stageRef.current;
  }, [store]);

  // Disarm when the visitor taps elsewhere or scrolls the figure out of view
  useEffect(() => {
    const stage = stageRef.current;
    if (!armed || !stage) return;
    const onDocDown = (e: PointerEvent) => {
      if (!stage.contains(e.target as Node)) setArmed(false);
    };
    const io = new IntersectionObserver(([en]) => !en.isIntersecting && setArmed(false), {
      threshold: 0.2,
    });
    document.addEventListener('pointerdown', onDocDown);
    io.observe(stage);
    return () => {
      document.removeEventListener('pointerdown', onDocDown);
      io.disconnect();
    };
  }, [armed]);
  const svgRef = useCallback(
    (el: SVGSVGElement | null) => {
      store.live.svg = el;
    },
    [store]
  );

  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!live3d || (needsArm && !armed && e.pointerType !== 'mouse')) return;
    drag.current = { down: true, x: e.clientX, y: e.clientY };
    store.live.dragging = true;
    store.live.touched = performance.now();
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!live3d) return;
    const r = e.currentTarget.getBoundingClientRect();
    store.live.pointer = {
      x: e.clientX - r.left,
      y: e.clientY - r.top,
      inside: e.pointerType === 'mouse',
    };
    const d = drag.current;
    if (!d.down) return;
    store.live.yawBase -= (e.clientX - d.x) * 0.008;
    store.live.pitch = clamp(
      store.live.pitch + (e.clientY - d.y) * 0.004,
      pitchRange[0],
      pitchRange[1]
    );
    d.x = e.clientX;
    d.y = e.clientY;
    store.live.touched = performance.now();
  };
  const onUp = () => {
    drag.current.down = false;
    store.live.dragging = false;
    store.live.touched = performance.now();
  };
  const onLeave = () => {
    store.live.pointer = { ...store.live.pointer, inside: false };
  };

  return (
    <figure className={styles.fig}>
      <div
        ref={stageRef}
        className={`${styles.stage} ${wide ? styles.wide : ''} ${live3d ? styles.live : ''} ${
          needsArm ? (armed ? styles.armed : styles.idle) : ''
        }`}
        role="img"
        aria-label={label}
        onClick={() => needsArm && !armed && setArmed(true)}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onPointerLeave={onLeave}
      >
        {(!live3d || !snap.ready) && still}
        {live3d && <Stage3D kind={kind} store={store} />}
        {live3d && balloons > 0 && (
          <svg
            ref={svgRef}
            className={styles.overlay}
            aria-hidden="true"
            style={{ visibility: snap.ready ? 'visible' : 'hidden' }}
          >
            {Array.from({ length: balloons }, (_, i) => (
              <g key={i} className={`${styles.balloon} ${i === active ? styles.balloonOn : ''}`}>
                <line />
                <circle className={styles.bDot} r={2.6} />
                <circle className={styles.bRing} r={12} />
                <text>{i + 1}</text>
              </g>
            ))}
          </svg>
        )}
        {needsArm && snap.ready && (
          <span className={styles.touchHint} aria-hidden="true">
            {armed ? 'Drag to turn · tap outside to finish' : 'Tap to turn in 3D'}
          </span>
        )}
        <span className={`${styles.reg} ${styles.tl}`} />
        <span className={`${styles.reg} ${styles.tr}`} />
        <span className={`${styles.reg} ${styles.bl}`} />
        <span className={`${styles.reg} ${styles.br}`} />
      </div>
      {controls}
      <ol className={styles.legend}>
        {legend.map((entry, i) => (
          <li key={entry.name}>
            <button
              type="button"
              className={i === active ? styles.legendOn : undefined}
              onMouseEnter={() => store.set({ hi: i })}
              onMouseLeave={() => store.set({ hi: -1 })}
              onFocus={() => store.set({ hi: i })}
              onBlur={() => store.set({ hi: -1 })}
              onClick={() => store.set({ hi: i })}
            >
              <span className={styles.no}>{i + 1}</span>
              <span>
                <b>{entry.name}</b> <span className={styles.detail}>· {entry.detail}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>
      <figcaption className={styles.cap}>{caption}</figcaption>
    </figure>
  );
}
