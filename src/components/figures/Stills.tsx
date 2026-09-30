import { treeLayout } from './tree-layout';
import { box, circle, fit, projector, rectSegs, type P2, type P3, type Shape } from './still-kit';
import styles from './figure.module.css';

type Grouped = Shape & { group?: number };

interface DrawingProps {
  shapes: Grouped[];
  yaw: number;
  pitch: number;
  vw: number;
  vh: number;
  pad: { l: number; r: number; t: number; b: number };
  anchors?: P3[];
  balloonOffset?: P2;
  active: number;
  /** Group drawn in the "ok" colour, e.g. the station a commit has reached. */
  lit?: number;
  /** Tree figure highlights a level of dots instead of a group of faces. */
  dotLevelOffset?: number;
}

const fillClass = {
  top: styles.fTop,
  front: styles.fFront,
  side: styles.fSide,
  none: styles.fNone,
};
const inkClass = { draft: styles.iDraft, line: styles.iLine, muted: styles.iMuted };

function Drawing({
  shapes,
  yaw,
  pitch,
  vw,
  vh,
  pad,
  anchors = [],
  balloonOffset = [54, -16],
  active,
  lit = -1,
  dotLevelOffset,
}: DrawingProps) {
  const proj = projector(yaw, pitch);
  const all: P2[] = [];
  for (const s of shapes) {
    if (s.kind === 'poly') s.pts.forEach((p) => all.push(proj(p)));
    else if (s.kind === 'seg') all.push(proj(s.a), proj(s.b));
    else if (s.kind === 'dot') all.push(proj(s.p));
    else {
      const [x, y, z] = s.c;
      circle(x, y + s.h / 2, z, s.r).forEach((p) => all.push(proj(p)));
      circle(x, y - s.h / 2, z, s.r).forEach((p) => all.push(proj(p)));
    }
  }
  const { map } = fit(all, vw, vh, pad);
  // Round to 0.1px: server and browser trig differ in the last digits, which breaks hydration
  const r1 = (n: number) => Math.round(n * 10) / 10;
  const P = (p: P3): P2 => {
    const [x, y] = map(proj(p));
    return [r1(x), r1(y)];
  };
  const pts = (list: P3[]) => list.map((p) => P(p).join(',')).join(' ');

  const balloons = anchors.map((a, i) => {
    const [ax, ay] = P(a);
    return { i, ax, ay, bx: Math.min(vw - 20, ax + balloonOffset[0]), by: ay + balloonOffset[1] };
  });
  const sorted = [...balloons].sort((a, b) => a.by - b.by);
  sorted.forEach((q, k) => {
    q.by = k === 0 ? Math.max(20, q.by) : Math.max(q.by, sorted[k - 1].by + 30);
  });

  return (
    <svg
      className={styles.still}
      viewBox={`0 0 ${vw} ${vh}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {shapes.map((s, k) => {
        const on = s.group !== undefined && s.group === active;
        const isLit = !on && s.group !== undefined && s.group === lit;
        const cls = on ? styles.on : isLit ? styles.lit : undefined;
        if (s.kind === 'poly') {
          return (
            <polygon
              key={k}
              points={pts(s.pts)}
              className={`${fillClass[s.fill]} ${inkClass[s.ink]} ${cls ?? ''}`}
            />
          );
        }
        if (s.kind === 'seg') {
          const [x1, y1] = P(s.a);
          const [x2, y2] = P(s.b);
          return (
            <line
              key={k}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              className={`${inkClass[s.ink]} ${s.dash ? styles.dash : ''} ${cls ?? ''}`}
            />
          );
        }
        if (s.kind === 'dot') {
          const [cx, cy] = P(s.p);
          const hot =
            dotLevelOffset !== undefined && active >= 0 && s.level === active + dotLevelOffset;
          return (
            <circle
              key={k}
              cx={cx}
              cy={cy}
              r={hot ? s.r * 1.5 : s.r}
              className={hot ? styles.dotOn : styles.dotInk}
            />
          );
        }
        const [x, y, z] = s.c;
        const top = circle(x, y + s.h / 2, z, s.r);
        const bottom = circle(x, y - s.h / 2, z, s.r);
        const tp = top.map((p) => P(p));
        const xs = tp.map((p) => p[0]);
        const [, ty] = P([x, y + s.h / 2, z]);
        const [, by] = P([x, y - s.h / 2, z]);
        const l = Math.min(...xs);
        const r = Math.max(...xs);
        return (
          <g key={k} className={cls}>
            <polygon points={pts(bottom)} className={`${styles.fSide} ${styles.iDraft}`} />
            <polygon
              points={`${l},${ty} ${r},${ty} ${r},${by} ${l},${by}`}
              className={styles.fFront}
            />
            <line x1={l} y1={ty} x2={l} y2={by} className={styles.iDraft} />
            <line x1={r} y1={ty} x2={r} y2={by} className={styles.iDraft} />
            <polygon points={pts(top)} className={`${styles.fTop} ${styles.iDraft}`} />
          </g>
        );
      })}
      {balloons.map((b) => {
        const dx = b.bx - b.ax;
        const dy = b.by - b.ay;
        const len = Math.hypot(dx, dy) || 1;
        return (
          <g key={b.i} className={`${styles.balloon} ${b.i === active ? styles.balloonOn : ''}`}>
            <line
              x1={b.ax}
              y1={b.ay}
              x2={r1(b.bx - (dx / len) * 12)}
              y2={r1(b.by - (dy / len) * 12)}
            />
            <circle className={styles.bDot} cx={b.ax} cy={b.ay} r={2.6} />
            <circle className={styles.bRing} cx={b.bx} cy={b.by} r={12} />
            <text x={b.bx} y={b.by}>
              {b.i + 1}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ---------- Fig. 1 ---------- */
const SW = 3.4;
const SH = 0.26;
const SD = 2.3;
const OX = -0.4;

export function StackStill({ active }: { active: number }) {
  const sep = 1.26;
  const shapes: Grouped[] = [];
  const yTop = 2 * sep + SH / 2 + 0.35;
  const yBot = -2 * sep - SH / 2 - 0.35;
  for (const [x, z] of [
    [-SW / 2, -SD / 2],
    [SW / 2, -SD / 2],
    [-SW / 2, SD / 2],
    [SW / 2, SD / 2],
  ]) {
    shapes.push({
      kind: 'seg',
      a: [x + OX, yTop, z],
      b: [x + OX, yBot, z],
      ink: 'muted',
      dash: true,
    });
  }
  const anchors: P3[] = [];
  for (let i = 4; i >= 0; i--) {
    const y = (2 - i) * sep;
    const top = y + SH / 2;
    const add = (s: Shape) => shapes.push({ ...s, group: i });
    box(OX, y, 0, SW, SH, SD).forEach(add);
    if (i === 0) {
      const gap = 0.12;
      const tw = (2.9 - gap * 3) / 4;
      const td = (1.9 - gap * 2) / 3;
      for (let c = 0; c < 4; c++)
        for (let r = 0; r < 3; r++) {
          const ax = -1.45 + c * (tw + gap) + OX;
          const az = -0.95 + r * (td + gap);
          rectSegs(ax, az, ax + tw, az + td, top).forEach(add);
        }
    }
    if (i === 1) {
      for (const z of [-0.6, 0, 0.6]) {
        const s = (a: P3, b: P3) => add({ kind: 'seg', a, b, ink: 'draft' });
        s([-1.2 + OX, top, z], [1.2 + OX, top, z]);
        s([1.2 + OX, top, z], [1.02 + OX, top, z - 0.12]);
        s([1.2 + OX, top, z], [1.02 + OX, top, z + 0.12]);
        s([-1.2 + OX, top, z], [-1.02 + OX, top, z - 0.12]);
        s([-1.2 + OX, top, z], [-1.02 + OX, top, z + 0.12]);
      }
    }
    if (i === 2) {
      for (const x of [-1.2, -0.4, 0.4, 1.2])
        box(x + OX, top + 0.22, 0, 0.44, 0.44, 0.44).forEach(add);
    }
    if (i === 3) {
      rectSegs(-0.95 + OX, -0.62, 0.95 + OX, 0.62, top).forEach(add);
      add({ kind: 'seg', a: [-0.95 + OX, top, -0.62], b: [OX, top, 0.1], ink: 'draft' });
      add({ kind: 'seg', a: [OX, top, 0.1], b: [0.95 + OX, top, -0.62], ink: 'draft' });
      rectSegs(-0.18 + OX, 0.2, 0.18 + OX, 0.46, top).forEach(add);
    }
    if (i === 4) {
      for (const x of [-1.05, 0, 1.05])
        add({ kind: 'cyl', c: [x + OX, top + 0.28, 0], r: 0.3, h: 0.56 });
    }
  }
  for (let i = 0; i < 5; i++) anchors.push([SW / 2 + OX, (2 - i) * sep + SH / 2, SD / 2]);
  return (
    <Drawing
      shapes={shapes}
      yaw={0.72}
      pitch={0.44}
      vw={540}
      vh={500}
      pad={{ l: 24, r: 80, t: 30, b: 24 }}
      anchors={anchors}
      active={active}
    />
  );
}

/* ---------- Fig. 2 ---------- */
const XS = [-3.9, -1.3, 1.3, 3.9];
const TOPS = [0.5, 0.8, 0.8, 1.1];
const SIZES = [1.2, 1.3, 1.3, 1.5];

export function PipelineStill({ active, lit }: { active: number; lit: number }) {
  const shapes: Grouped[] = [];
  rectSegs(-4.9, -1.4, 5.0, 1.4, 0, 'line').forEach((s) => shapes.push(s));
  shapes.push({ kind: 'seg', a: [XS[0], 0.12, 0], b: [XS[3], 0.12, 0], ink: 'draft', dash: true });
  [0.1, 0.22, 0.36, 0.5, 0.63, 0.78, 0.9].forEach((t, k) =>
    shapes.push({
      kind: 'dot',
      p: [XS[0] + (XS[3] - XS[0]) * t, 0.12, ((k % 3) - 1) * 0.28],
      r: 2.2,
    })
  );
  XS.forEach((x, i) => {
    const add = (s: Shape) => shapes.push({ ...s, group: i });
    box(x, TOPS[i] / 2, 0, SIZES[i], TOPS[i], SIZES[i]).forEach(add);
    const y = TOPS[i];
    const seg = (a: P3, b: P3) => add({ kind: 'seg', a, b, ink: 'draft' });
    if (i === 0) {
      seg([x - 0.4, y, 0], [x + 0.4, y, 0]);
      seg([x - 0.1, y, 0], [x + 0.15, y, -0.35]);
      seg([x + 0.15, y, -0.35], [x + 0.4, y, -0.35]);
    }
    if (i === 1) {
      for (const z of [-0.35, 0, 0.35]) {
        seg([x - 0.3, y, z], [x - 0.12, y, z + 0.1]);
        seg([x - 0.12, y, z + 0.1], [x + 0.3, y, z - 0.14]);
      }
    }
    if (i === 2) {
      rectSegs(x - 0.45, -0.35, x + 0.45, 0.35, y).forEach(add);
      seg([x - 0.45, y, -0.2], [x + 0.45, y, -0.2]);
    }
    if (i === 3) {
      const ring = circle(x, y, 0, 0.48, 32);
      ring.forEach((p, k) => seg(p, ring[(k + 1) % ring.length]));
      seg([x - 0.48, y, 0], [x + 0.48, y, 0]);
      seg([x, y, -0.48], [x, y, 0.48]);
    }
  });
  return (
    <Drawing
      shapes={shapes}
      yaw={0.35}
      pitch={0.55}
      vw={600}
      vh={400}
      pad={{ l: 24, r: 40, t: 56, b: 24 }}
      anchors={XS.map((x, i) => [x + 0.55, TOPS[i], 0.55] as P3)}
      balloonOffset={[20, -38]}
      active={active}
      lit={lit}
    />
  );
}

/* ---------- Fig. 3 ---------- */
const DOT_R = [6.5, 5, 3.5, 2.25];

export function TreeStill({ active }: { active: number }) {
  const { levels, edges, rings } = treeLayout();
  const shapes: Grouped[] = [];
  rings.forEach((ring) =>
    ring.forEach(
      (p, k) => k > 0 && shapes.push({ kind: 'seg', a: ring[k - 1], b: p, ink: 'line', dash: true })
    )
  );
  edges.forEach(([a, b]) => shapes.push({ kind: 'seg', a, b, ink: 'muted' }));
  levels.forEach((pts, level) =>
    pts.forEach((p) => shapes.push({ kind: 'dot', p, r: DOT_R[level], level }))
  );
  return (
    <Drawing
      shapes={shapes}
      yaw={0.3}
      pitch={0.5}
      vw={540}
      vh={500}
      pad={{ l: 24, r: 24, t: 24, b: 24 }}
      active={active}
      dotLevelOffset={1}
    />
  );
}
