'use client';

import { PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { drawBalloon, type FigureStore } from '../store';
import { clamp, faceMats, fitDist, idleYaw, placeCam, rect, segs, tint } from '../three-kit';
import { usePalette } from '../usePalette';

/** Station x positions: commit, checks, preview, production. */
const XS = [-3.9, -1.3, 1.3, 3.9];
/** Height of each station's top face. */
const TOPS = [0.5, 0.8, 0.8, 1.1];
const TRAVEL_MS = 5200;

function build() {
  const g = new THREE.Group();
  const box = (w: number, h: number, d: number, x: number) => {
    const geo = new THREE.BoxGeometry(w, h, d);
    const m = faceMats();
    const edge = new THREE.LineBasicMaterial();
    const mesh = new THREE.Mesh(geo, m.arr);
    mesh.position.set(x, h / 2, 0);
    const e = new THREE.LineSegments(new THREE.EdgesGeometry(geo), edge);
    e.position.copy(mesh.position);
    g.add(mesh, e);
    return { m, edge };
  };
  const stations = [
    box(1.2, 0.5, 1.2, XS[0]),
    box(1.3, 0.8, 1.3, XS[1]),
    box(1.3, 0.8, 1.3, XS[2]),
    box(1.5, 1.1, 1.5, XS[3]),
  ];

  const detail = new THREE.LineBasicMaterial();
  const p: number[] = [];
  const y0 = TOPS[0] + 0.003;
  const y1 = TOPS[1] + 0.003;
  const y3 = TOPS[3] + 0.003;
  // Commit: a small branch graph
  p.push(XS[0] - 0.4, y0, 0, XS[0] + 0.4, y0, 0, XS[0] - 0.1, y0, 0, XS[0] + 0.15, y0, -0.35);
  p.push(XS[0] + 0.15, y0, -0.35, XS[0] + 0.4, y0, -0.35);
  // Checks: three ticks
  for (const z of [-0.35, 0, 0.35]) {
    p.push(
      XS[1] - 0.3,
      y1,
      z,
      XS[1] - 0.12,
      y1,
      z + 0.1,
      XS[1] - 0.12,
      y1,
      z + 0.1,
      XS[1] + 0.3,
      y1,
      z - 0.14
    );
  }
  // Preview: a browser window
  rect(XS[2] - 0.45, -0.35, XS[2] + 0.45, 0.35, y1, p);
  p.push(XS[2] - 0.45, y1, -0.2, XS[2] + 0.45, y1, -0.2);
  // Production: a globe
  for (let k = 0; k < 32; k++) {
    const a = (k / 32) * Math.PI * 2;
    const b = ((k + 1) / 32) * Math.PI * 2;
    p.push(
      XS[3] + 0.48 * Math.cos(a),
      y3,
      0.48 * Math.sin(a),
      XS[3] + 0.48 * Math.cos(b),
      y3,
      0.48 * Math.sin(b)
    );
  }
  p.push(XS[3] - 0.48, y3, 0, XS[3] + 0.48, y3, 0, XS[3], y3, -0.48, XS[3], y3, 0.48);
  g.add(new THREE.LineSegments(segs(p), detail));

  const floor = new THREE.LineBasicMaterial();
  g.add(new THREE.LineSegments(segs(rect(-4.9, -1.4, 5.0, 1.4, 0, [])), floor));

  const track = new THREE.LineDashedMaterial({ dashSize: 0.1, gapSize: 0.08 });
  const trackLine = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(XS[0], 0.12, 0),
      new THREE.Vector3(XS[3], 0.12, 0),
    ]),
    track
  );
  trackLine.computeLineDistances();
  g.add(trackLine);

  // Ambient traffic: routine deploys flowing along the track
  const count = 18;
  const pos = new Float32Array(count * 3);
  const packetGeo = new THREE.BufferGeometry();
  packetGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const packetMat = new THREE.PointsMaterial({
    size: 5,
    sizeAttenuation: false,
    transparent: true,
    opacity: 0.55,
  });
  g.add(new THREE.Points(packetGeo, packetMat));

  // The visitor's own commit
  const commitGeo = new THREE.BoxGeometry(0.34, 0.34, 0.34);
  const commit = new THREE.Mesh(commitGeo, new THREE.MeshBasicMaterial());
  const commitEdge = new THREE.LineSegments(
    new THREE.EdgesGeometry(commitGeo),
    new THREE.LineBasicMaterial()
  );
  commit.add(commitEdge);
  commit.visible = false;
  g.add(commit);

  return {
    g,
    stations,
    detail,
    floor,
    track,
    pos,
    packetGeo,
    packetMat,
    count,
    commit,
    commitEdge,
  };
}

export default function PipelineScene({ store }: { store: FigureStore }) {
  const cam = useRef<THREE.PerspectiveCamera>(null);
  const kit = useMemo(build, []);
  const palette = usePalette();
  const s = useRef({
    palette,
    painted: '',
    amb: Array.from({ length: 18 }, (_, i) => i / 18),
    run: { at: 0, handled: 0, doneAt: 0 },
    v: new THREE.Vector3(),
    look: new THREE.Vector3(0, 0.3, 0),
  });

  useEffect(() => {
    s.current.palette = palette;
    s.current.painted = '';
  }, [palette]);

  useEffect(
    () => () => {
      kit.g.traverse((o) => {
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
    const now = performance.now();
    const w = stage.clientWidth;
    const h = stage.clientHeight;

    // Ambient packets
    for (let i = 0; i < kit.count; i++) {
      st.amb[i] = (st.amb[i] + dt * 0.06) % 1;
      kit.pos[i * 3] = XS[0] + (XS[3] - XS[0]) * st.amb[i];
      kit.pos[i * 3 + 1] = 0.12;
      kit.pos[i * 3 + 2] = ((i % 3) - 1) * 0.28;
    }
    kit.packetGeo.attributes.position.needsUpdate = true;

    // The pushed commit: pause at each station, hop to the next
    const run = st.run;
    if (live.pushAt > run.handled) {
      run.handled = live.pushAt;
      run.at = live.pushAt;
      run.doneAt = 0;
      kit.commit.visible = true;
    }
    let at = -1;
    if (run.at) {
      const t = clamp((now - run.at) / TRAVEL_MS, 0, 1);
      const seg = t * 3;
      const k = Math.floor(Math.min(seg, 2.999));
      const f = seg - k;
      const e = f < 0.45 ? 0 : (f - 0.45) / 0.55;
      const eased = e * e * (3 - 2 * e);
      at = t >= 1 ? 3 : f < 0.45 ? k : -1;
      const x = t >= 1 ? XS[3] : XS[k] + (XS[k + 1] - XS[k]) * eased;
      const ty = TOPS.map((v) => v + 0.17);
      const y =
        at >= 0 ? ty[at] : ty[k] + (ty[k + 1] - ty[k]) * eased + Math.sin(eased * Math.PI) * 0.45;
      kit.commit.position.set(x, y, 0);
      kit.commit.rotation.y += dt * 1.2;
      store.set({ stage: at >= 0 ? at : k });
      if (t >= 1) {
        if (!run.doneAt) run.doneAt = now;
        if (now - run.doneAt > 4000) {
          run.at = 0;
          kit.commit.visible = false;
          store.set({ stage: -1 });
        }
      }
    }

    const { hi } = store.get();
    const key = `${hi}:${at}`;
    if (key !== st.painted) {
      const p = st.palette;
      kit.stations.forEach((b, i) => {
        const on = i === hi;
        const hot = i === at;
        tint(b.m, p, on ? p.callout : hot ? p.ok : null, on ? 0.3 : hot ? 0.25 : 0);
        b.edge.color.copy(on ? p.callout : hot ? p.ok : p.draft);
      });
      kit.detail.color.copy(p.draft);
      kit.floor.color.copy(p.line);
      kit.track.color.copy(p.draft);
      kit.packetMat.color.copy(p.draft);
      (kit.commit.material as THREE.MeshBasicMaterial).color.copy(p.callout);
      (kit.commitEdge.material as THREE.LineBasicMaterial).color.copy(p.draft);
      st.painted = key;
    }

    placeCam(
      camera,
      idleYaw(live, now, 0.12, 3200),
      live.pitch,
      fitDist(camera, 5.2, 2.2),
      st.look
    );
    camera.updateMatrixWorld();
    kit.g.updateMatrixWorld(true);

    const svg = live.svg;
    if (svg && svg.children.length >= 4) {
      XS.forEach((x, i) => {
        st.v.set(x + 0.55, TOPS[i], 0.55).project(camera);
        const ax = ((st.v.x + 1) / 2) * w;
        const ay = ((1 - st.v.y) / 2) * h;
        drawBalloon(
          svg.children[i],
          ax,
          ay,
          clamp(ax + 20, 20, w - 20),
          clamp(ay - 38, 20, h - 20)
        );
      });
    }

    if (!store.get().ready) store.set({ ready: true });
  });

  return (
    <>
      <PerspectiveCamera ref={cam} makeDefault fov={30} near={0.1} far={100} />
      <primitive object={kit.g} />
    </>
  );
}
