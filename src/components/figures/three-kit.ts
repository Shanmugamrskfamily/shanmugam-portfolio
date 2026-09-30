import * as THREE from 'three';

export { clamp } from './math';

/** Line segments from a flat [x,y,z, x,y,z, …] array. */
export function segs(arr: number[]) {
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(arr, 3));
  return g;
}

/** Appends a horizontal rectangle outline at height y. */
export function rect(x0: number, z0: number, x1: number, z1: number, y: number, out: number[]) {
  out.push(x0, y, z0, x1, y, z0, x1, y, z0, x1, y, z1, x1, y, z1, x0, y, z1, x0, y, z1, x0, y, z0);
  return out;
}

/** Three flat materials so top, front and side faces read like a shaded drawing. */
export function faceMats() {
  const o = { polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 };
  const side = new THREE.MeshBasicMaterial(o);
  const top = new THREE.MeshBasicMaterial(o);
  const front = new THREE.MeshBasicMaterial(o);
  // BoxGeometry face order: +x, -x, +y, -y, +z, -z
  return { side, top, front, arr: [side, side, top, side, front, side] };
}

/** Camera distance that fits a half-width and half-height box at the current aspect. */
export function fitDist(cam: THREE.PerspectiveCamera, halfW: number, halfH: number) {
  const vf = THREE.MathUtils.degToRad(cam.fov);
  const hf = 2 * Math.atan(Math.tan(vf / 2) * cam.aspect);
  return Math.max(halfH / Math.tan(vf / 2), halfW / Math.tan(hf / 2));
}

export function placeCam(
  cam: THREE.PerspectiveCamera,
  yaw: number,
  pitch: number,
  dist: number,
  look: THREE.Vector3
) {
  cam.position.set(
    look.x + dist * Math.cos(pitch) * Math.sin(yaw),
    look.y + dist * Math.sin(pitch),
    look.z + dist * Math.cos(pitch) * Math.cos(yaw)
  );
  cam.lookAt(look);
}

/** Idle sway after the visitor stops dragging, so the drawing feels alive but calm. */
export function idleYaw(
  live: { yawBase: number; dragging: boolean; touched: number },
  now: number,
  amp: number,
  period: number
) {
  if (live.dragging || now - live.touched < 2200) return live.yawBase;
  return live.yawBase + Math.sin(now / period) * amp;
}

export interface Palette {
  draft: THREE.Color;
  callout: THREE.Color;
  ok: THREE.Color;
  top: THREE.Color;
  front: THREE.Color;
  side: THREE.Color;
  muted: THREE.Color;
  line: THREE.Color;
}

/** Reads the theme tokens from CSS so the 3D drawing always matches the page. */
export function readPalette(): Palette {
  const cs = getComputedStyle(document.documentElement);
  const c = (name: string) => new THREE.Color(cs.getPropertyValue(name).trim() || '#888888');
  return {
    draft: c('--draft'),
    callout: c('--callout'),
    ok: c('--ok'),
    top: c('--a-top'),
    front: c('--a-front'),
    side: c('--a-side'),
    muted: c('--muted'),
    line: c('--line'),
  };
}

/** Tints a face-material trio towards a colour. */
export function tint(
  m: ReturnType<typeof faceMats>,
  p: Palette,
  color: THREE.Color | null,
  amount: number
) {
  m.top.color.copy(p.top);
  m.front.color.copy(p.front);
  m.side.color.copy(p.side);
  if (color && amount > 0) {
    m.top.color.lerp(color, amount);
    m.front.color.lerp(color, amount * 0.8);
    m.side.color.lerp(color, amount * 0.6);
  }
}
