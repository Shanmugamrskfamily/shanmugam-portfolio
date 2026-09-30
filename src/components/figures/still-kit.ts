/**
 * Orthographic projection helpers for the still (SVG) versions of the figures.
 * Same world coordinates as the 3D scenes, so stills and 3D match.
 */
export type P3 = [number, number, number];
export type P2 = [number, number];
export type Fill = 'top' | 'front' | 'side' | 'none';
export type Ink = 'draft' | 'line' | 'muted';

export interface Poly {
  kind: 'poly';
  pts: P3[];
  fill: Fill;
  ink: Ink;
}
export interface Seg {
  kind: 'seg';
  a: P3;
  b: P3;
  ink: Ink;
  dash?: boolean;
}
export interface Dot {
  kind: 'dot';
  p: P3;
  r: number;
  level?: number;
}
export interface Cyl {
  kind: 'cyl';
  c: P3;
  r: number;
  h: number;
}
export type Shape = Poly | Seg | Dot | Cyl;

export function projector(yaw: number, pitch: number) {
  const cy = Math.cos(yaw);
  const sy = Math.sin(yaw);
  const cp = Math.cos(pitch);
  const sp = Math.sin(pitch);
  return ([x, y, z]: P3): P2 => {
    const depthAxis = x * sy + z * cy;
    return [x * cy - z * sy, -(y * cp - depthAxis * sp)];
  };
}

/** The three faces of a box visible from a camera up and to the front-right. */
export function box(cx: number, cy: number, cz: number, w: number, h: number, d: number): Poly[] {
  const x0 = cx - w / 2;
  const x1 = cx + w / 2;
  const y0 = cy - h / 2;
  const y1 = cy + h / 2;
  const z0 = cz - d / 2;
  const z1 = cz + d / 2;
  return [
    {
      kind: 'poly',
      fill: 'side',
      ink: 'draft',
      pts: [
        [x1, y0, z1],
        [x1, y0, z0],
        [x1, y1, z0],
        [x1, y1, z1],
      ],
    },
    {
      kind: 'poly',
      fill: 'front',
      ink: 'draft',
      pts: [
        [x0, y0, z1],
        [x1, y0, z1],
        [x1, y1, z1],
        [x0, y1, z1],
      ],
    },
    {
      kind: 'poly',
      fill: 'top',
      ink: 'draft',
      pts: [
        [x0, y1, z0],
        [x1, y1, z0],
        [x1, y1, z1],
        [x0, y1, z1],
      ],
    },
  ];
}

export function rectSegs(
  x0: number,
  z0: number,
  x1: number,
  z1: number,
  y: number,
  ink: Ink = 'draft'
): Seg[] {
  const c: P3[] = [
    [x0, y, z0],
    [x1, y, z0],
    [x1, y, z1],
    [x0, y, z1],
  ];
  return c.map((a, i) => ({ kind: 'seg', a, b: c[(i + 1) % 4], ink }));
}

/** Points around a horizontal circle, used for cylinder ends and rings. */
export function circle(cx: number, y: number, cz: number, r: number, n = 28): P3[] {
  return Array.from({ length: n }, (_, k) => {
    const a = (k / n) * Math.PI * 2;
    return [cx + r * Math.cos(a), y, cz + r * Math.sin(a)] as P3;
  });
}

/** Fits projected shapes into a viewBox, leaving extra room on the right for balloons. */
export function fit(
  points: P2[],
  vw: number,
  vh: number,
  pad: { l: number; r: number; t: number; b: number }
) {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (const [x, y] of points) {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  const s = Math.min((vw - pad.l - pad.r) / (maxX - minX), (vh - pad.t - pad.b) / (maxY - minY));
  const ox = pad.l + (vw - pad.l - pad.r - (maxX - minX) * s) / 2 - minX * s;
  const oy = pad.t + (vh - pad.t - pad.b - (maxY - minY) * s) / 2 - minY * s;
  return { scale: s, map: ([x, y]: P2): P2 => [ox + x * s, oy + y * s] };
}
