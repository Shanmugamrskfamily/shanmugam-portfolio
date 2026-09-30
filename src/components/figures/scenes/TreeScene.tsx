'use client';

import { PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { FigureStore } from '../store';
import { fitDist, placeCam, segs } from '../three-kit';
import { usePalette } from '../usePalette';
import { treeLayout } from '../tree-layout';

const SIZES = [13, 10, 7, 4.5];

/** Fig. 3 — the rstechnologies.in catalogue as statically generated pages. */
function build() {
  const g = new THREE.Group();
  const { levels, links, rings } = treeLayout();
  const linkMat = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.55 });
  g.add(new THREE.LineSegments(segs(links), linkMat));
  const pointMats = levels.map((pts, i) => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pts.flat(), 3));
    const m = new THREE.PointsMaterial({ size: SIZES[i], sizeAttenuation: false });
    g.add(new THREE.Points(geo, m));
    return m;
  });
  const ringMat = new THREE.LineDashedMaterial({ dashSize: 0.1, gapSize: 0.08 });
  for (const ring of rings) {
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(ring.map(([x, y, z]) => new THREE.Vector3(x, y, z))),
      ringMat
    );
    line.computeLineDistances();
    g.add(line);
  }
  return { g, linkMat, pointMats, ringMat };
}

export default function TreeScene({ store }: { store: FigureStore }) {
  const cam = useRef<THREE.PerspectiveCamera>(null);
  const kit = useMemo(build, []);
  const palette = usePalette();
  const s = useRef({ palette, painted: -2, look: new THREE.Vector3(0, 0.25, 0) });

  useEffect(() => {
    s.current.palette = palette;
    s.current.painted = -2;
  }, [palette]);

  useEffect(
    () => () => {
      kit.g.traverse((o) => {
        const obj = o as THREE.Mesh;
        obj.geometry?.dispose();
        (obj.material as THREE.Material | undefined)?.dispose();
      });
    },
    [kit]
  );

  useFrame((_, dt) => {
    const camera = cam.current;
    const live = store.live;
    if (!camera || !live.stage) return;
    const st = s.current;
    const now = performance.now();

    const { hi } = store.get();
    if (hi !== st.painted) {
      const p = st.palette;
      kit.pointMats.forEach((m, i) => {
        const on = hi >= 0 && i === hi + 1;
        m.color.copy(on ? p.callout : p.draft);
        m.size = SIZES[i] * (on ? 1.5 : 1);
      });
      kit.linkMat.color.copy(p.draft);
      kit.ringMat.color.copy(p.line);
      st.painted = hi;
    }

    // Slow turntable once the visitor lets go
    if (!live.dragging && now - live.touched > 2200) live.yawBase += dt * 0.12;
    placeCam(camera, live.yawBase, live.pitch, fitDist(camera, 3.7, 2.7), st.look);

    if (!store.get().ready) store.set({ ready: true });
  });

  return (
    <>
      <PerspectiveCamera ref={cam} makeDefault fov={30} near={0.1} far={100} />
      <primitive object={kit.g} />
    </>
  );
}
