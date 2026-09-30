/**
 * A tiny per-figure store shared by the DOM controls (legend, buttons, drag)
 * and the WebGL scene. Reactive fields re-render React; `live` fields are read
 * every frame by the scene and never trigger renders.
 */
export interface FigureSnapshot {
  /** Legend item under the pointer or keyboard focus, -1 for none. */
  hi: number;
  /** Scene object under the pointer, -1 for none. */
  hover: number;
  /** Set once the 3D view has drawn its first frame. */
  ready: boolean;
  /** Pipeline figure: which station the pushed commit is at, -1 when idle. */
  stage: number;
}

export interface FigureLive {
  yawBase: number;
  pitch: number;
  dragging: boolean;
  touched: number;
  /** Stack figure: explode amount the slider asks for, 0–1. */
  sep: number;
  /** Stage-relative pointer position in CSS pixels, for hover picking. */
  pointer: { x: number; y: number; inside: boolean };
  /** Pipeline figure: timestamp of the latest push, 0 when none. */
  pushAt: number;
  svg: SVGSVGElement | null;
  stage: HTMLDivElement | null;
}

export interface FigureStore {
  get: () => FigureSnapshot;
  set: (patch: Partial<FigureSnapshot>) => void;
  subscribe: (fn: () => void) => () => void;
  live: FigureLive;
}

export function createFigureStore(orbit: { yaw: number; pitch: number }): FigureStore {
  let snap: FigureSnapshot = { hi: -1, hover: -1, ready: false, stage: -1 };
  const subs = new Set<() => void>();
  return {
    get: () => snap,
    set(patch) {
      let changed = false;
      for (const k of Object.keys(patch) as (keyof FigureSnapshot)[]) {
        if (snap[k] !== patch[k]) changed = true;
      }
      if (!changed) return;
      snap = { ...snap, ...patch };
      subs.forEach((fn) => fn());
    },
    subscribe(fn) {
      subs.add(fn);
      return () => subs.delete(fn);
    },
    live: {
      yawBase: orbit.yaw,
      pitch: orbit.pitch,
      dragging: false,
      touched: -1e9,
      sep: 0,
      pointer: { x: 0, y: 0, inside: false },
      pushAt: 0,
      svg: null,
      stage: null,
    },
  };
}

/** Moves one SVG balloon (leader line, anchor dot, numbered ring) into place. */
export function drawBalloon(g: Element, ax: number, ay: number, bx: number, by: number) {
  const [line, dot, ring, text] = Array.from(g.children);
  const dx = bx - ax;
  const dy = by - ay;
  const len = Math.hypot(dx, dy) || 1;
  line.setAttribute('x1', String(ax));
  line.setAttribute('y1', String(ay));
  line.setAttribute('x2', String(bx - (dx / len) * 12));
  line.setAttribute('y2', String(by - (dy / len) * 12));
  dot.setAttribute('cx', String(ax));
  dot.setAttribute('cy', String(ay));
  ring.setAttribute('cx', String(bx));
  ring.setAttribute('cy', String(by));
  text.setAttribute('x', String(bx));
  text.setAttribute('y', String(by));
}
