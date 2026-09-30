'use client';

import { PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { drawBalloon, type FigureStore } from '../store';
import { faceMats, fitDist, idleYaw, placeCam, rect, segs, tint } from '../three-kit';
import { usePalette } from '../usePalette';

// Slab size: width, height, depth
const SW = 3.4;
const SH = 0.26;
const SD = 2.3;

/** Fig. 1 — the five layers of rstechnologies.in as an exploded assembly. */
function build() {
  const root = new THREE.Group();
  root.position.x = -0.4;
  const slabs = Array.from({ length: 5 }, (_, i) => {
    const g = new THREE.Group();
    const geo = new THREE.BoxGeometry(SW, SH, SD);
    const m = faceMats();
    const mesh = new THREE.Mesh(geo, m.arr);
    mesh.userData.i = i;
    const edge = new THREE.LineBasicMaterial();
    g.add(mesh, new THREE.LineSegments(new THREE.EdgesGeometry(geo), edge));
    const top = SH / 2 + 0.003;

    if (i === 0) {
      // Interface: a grid of pages
      const p: number[] = [];
      const gap = 0.12;
      const tw = (2.9 - gap * 3) / 4;
      const td = (1.9 - gap * 2) / 3;
      for (let c = 0; c < 4; c++)
        for (let r = 0; r < 3; r++) {
          const ax = -1.45 + c * (tw + gap);
          const az = -0.95 + r * (td + gap);
          rect(ax, az, ax + tw, az + td, top, p);
        }
      g.add(new THREE.LineSegments(segs(p), edge));
    }
    if (i === 1) {
      // API: request and response arrows
      const p: number[] = [];
      for (const z of [-0.6, 0, 0.6]) {
        p.push(-1.2, top, z, 1.2, top, z);
        p.push(1.2, top, z, 1.02, top, z - 0.12, 1.2, top, z, 1.02, top, z + 0.12);
        p.push(-1.2, top, z, -1.02, top, z - 0.12, -1.2, top, z, -1.02, top, z + 0.12);
      }
      g.add(new THREE.LineSegments(segs(p), edge));
    }
    if (i === 2) {
      // Access: one block per role
      const cg = new THREE.BoxGeometry(0.44, 0.44, 0.44);
      const ce = new THREE.EdgesGeometry(cg);
      for (const x of [-1.2, -0.4, 0.4, 1.2]) {
        const cube = new THREE.Mesh(cg, m.arr);
        cube.position.set(x, SH / 2 + 0.22, 0);
        const e = new THREE.LineSegments(ce, edge);
        e.position.copy(cube.position);
        g.add(cube, e);
      }
    }
    if (i === 3) {
      // Transport: a sealed envelope
      const p: number[] = [];
      rect(-0.95, -0.62, 0.95, 0.62, top, p);
      p.push(-0.95, top, -0.62, 0, top, 0.1, 0, top, 0.1, 0.95, top, -0.62);
      rect(-0.18, 0.2, 0.18, 0.46, top, p);
      g.add(new THREE.LineSegments(segs(p), edge));
    }
    if (i === 4) {
      // Data: three collections
      const cy = new THREE.CylinderGeometry(0.3, 0.3, 0.56, 28);
      const cye = new THREE.EdgesGeometry(cy, 30);
      for (const x of [-1.05, 0, 1.05]) {
        const can = new THREE.Mesh(cy, [m.front, m.top, m.side]);
        can.position.set(x, SH / 2 + 0.28, 0);
        const e = new THREE.LineSegments(cye, edge);
        e.position.copy(can.position);
        g.add(can, e);
      }
    }
    root.add(g);
    return { g, mesh, m, edge };
  });

  // Dashed alignment traces through the four corners, like an exploded-view drawing
  const tracePos = new Float32Array(24);
  const traceGeo = new THREE.BufferGeometry();
  traceGeo.setAttribute('position', new THREE.BufferAttribute(tracePos, 3));
  const traceMat = new THREE.LineDashedMaterial({ dashSize: 0.12, gapSize: 0.09 });
  const traces = new THREE.LineSegments(traceGeo, traceMat);
  root.add(traces);

  return { root, slabs, tracePos, traceGeo, traceMat, traces };
}

const CORNERS: [number, number][] = [
  [-SW / 2, -SD / 2],
  [SW / 2, -SD / 2],
  [SW / 2, SD / 2],
  [-SW / 2, SD / 2],
];

export default function StackScene({ store }: { store: FigureStore }) {
  const cam = useRef<THREE.PerspectiveCamera>(null);
  const kit = useMemo(build, []);
  const palette = usePalette();
  const s = useRef({
    t: 0,
    painted: -2,
    palette,
    ray: new THREE.Raycaster(),
    ndc: new THREE.Vector2(),
    v: new THREE.Vector3(),
    look: new THREE.Vector3(-0.2, 0, 0),
  });

  useEffect(() => {
    s.current.palette = palette;
    s.current.painted = -2;
  }, [palette]);

  useEffect(
    () => () => {
      kit.root.traverse((o) => {
        const obj = o as THREE.Mesh;
        obj.geometry?.dispose();
        const mat = obj.material;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else mat?.dispose();
      });
    },
    [kit]
  );

  useFrame((_, dt) => {
    const camera = cam.current;
    const live = store.live;
    const stage = live.stage;
    if (!camera || !stage) return;
    const st = s.current;
    const w = stage.clientWidth;
    const h = stage.clientHeight;
    const now = performance.now();

    // Hover picking from the stage-relative pointer
    const snap = store.get();
    if (live.pointer.inside && !live.dragging) {
      st.ndc.set((live.pointer.x / w) * 2 - 1, -(live.pointer.y / h) * 2 + 1);
      st.ray.setFromCamera(st.ndc, camera);
      const hit = st.ray.intersectObjects(
        kit.slabs.map((x) => x.mesh),
        false
      )[0];
      store.set({ hover: hit ? (hit.object.userData.i as number) : -1 });
    } else if (snap.hover !== -1 && !live.pointer.inside) {
      store.set({ hover: -1 });
    }

    const { hi, hover } = store.get();
    const active = hi >= 0 ? hi : hover;
    if (active !== st.painted) {
      const p = st.palette;
      kit.slabs.forEach((slab, i) => {
        const on = i === active;
        tint(slab.m, p, on ? p.callout : null, on ? 0.3 : 0);
        slab.edge.color.copy(on ? p.callout : p.draft);
      });
      kit.traceMat.color.copy(p.muted);
      st.painted = active;
    }

    // Explode towards the slider value
    st.t += (live.sep - st.t) * Math.min(1, dt * 8);
    if (Math.abs(live.sep - st.t) < 0.001) st.t = live.sep;
    const sep = 0.66 + st.t * 0.6;
    kit.slabs.forEach((slab, i) => {
      slab.g.position.y = (2 - i) * sep;
    });
    const yTop = 2 * sep + SH / 2 + 0.35;
    const yBot = -2 * sep - SH / 2 - 0.35;
    CORNERS.forEach(([x, z], k) => kit.tracePos.set([x, yTop, z, x, yBot, z], k * 6));
    kit.traceGeo.attributes.position.needsUpdate = true;
    kit.traces.computeLineDistances();

    placeCam(
      camera,
      idleYaw(live, now, 0.16, 2800),
      live.pitch,
      fitDist(camera, 3.7, 3.95),
      st.look
    );
    camera.updateMatrixWorld();
    kit.root.updateMatrixWorld(true);

    // Balloon callouts, spread so they never overlap
    const svg = live.svg;
    if (svg && svg.children.length >= 5) {
      const pts = kit.slabs.map((slab, i) => {
        st.v.set(SW / 2, SH / 2, SD / 2);
        slab.g.localToWorld(st.v);
        st.v.project(camera);
        const ax = ((st.v.x + 1) / 2) * w;
        const ay = ((1 - st.v.y) / 2) * h;
        return { i, ax, ay, bx: Math.min(w - 20, ax + 54), by: ay - 16 };
      });
      const sorted = [...pts].sort((a, b) => a.by - b.by);
      sorted.forEach((q, k) => {
        q.by = k === 0 ? Math.max(20, q.by) : Math.max(q.by, sorted[k - 1].by + 30);
      });
      const over = sorted[sorted.length - 1].by - (h - 20);
      if (over > 0) sorted.forEach((q) => (q.by -= over));
      pts.forEach((q) => drawBalloon(svg.children[q.i], q.ax, q.ay, q.bx, q.by));
    }

    if (!snap.ready) store.set({ ready: true });
  });

  return (
    <>
      <PerspectiveCamera ref={cam} makeDefault fov={30} near={0.1} far={100} />
      <primitive object={kit.root} />
    </>
  );
}
