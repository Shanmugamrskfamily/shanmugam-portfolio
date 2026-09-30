'use client';

import { useSyncExternalStore } from 'react';

export type FigureMode = '3d' | 'still';

const REDUCED = '(prefers-reduced-motion: reduce)';
const PHONE = '(max-width: 700px), (pointer: coarse) and (max-width: 1024px)';
const COARSE = '(pointer: coarse)';

let webgl: boolean | null = null;
function hasWebGL() {
  if (webgl === null) {
    try {
      const c = document.createElement('canvas');
      webgl = !!(c.getContext('webgl2') || c.getContext('webgl'));
    } catch {
      webgl = false;
    }
  }
  return webgl;
}

/** Devices likely to stutter: under 4 GB where the browser reports memory, or fewer than 4 cores. */
function lowEnd() {
  const nav = navigator as Navigator & { deviceMemory?: number };
  const lowMemory = nav.deviceMemory !== undefined && nav.deviceMemory < 4;
  const fewCores = nav.hardwareConcurrency > 0 && nav.hardwareConcurrency < 4;
  return lowMemory || fewCores;
}

// Phones wait until the page has loaded and gone idle, so 3D never delays the first readable screen
let idle = false;
let idleScheduled = false;
const idleSubs = new Set<() => void>();
function scheduleIdle() {
  if (idle || idleScheduled) return;
  idleScheduled = true;
  const go = () => {
    idle = true;
    idleSubs.forEach((fn) => fn());
  };
  const later = () => {
    if (typeof window.requestIdleCallback === 'function')
      window.requestIdleCallback(go, { timeout: 2500 });
    else window.setTimeout(go, 1200);
  };
  if (document.readyState === 'complete') later();
  else window.addEventListener('load', later, { once: true });
}

function subscribe(fn: () => void) {
  const queries = [REDUCED, PHONE].map((q) => matchMedia(q));
  queries.forEach((q) => q.addEventListener('change', fn));
  idleSubs.add(fn);
  scheduleIdle();
  return () => {
    queries.forEach((q) => q.removeEventListener('change', fn));
    idleSubs.delete(fn);
  };
}

function snapshot(onPhone: boolean): FigureMode {
  if (matchMedia(REDUCED).matches || !hasWebGL()) return 'still';
  if (!matchMedia(PHONE).matches) return '3d';
  return onPhone && idle && !lowEnd() ? '3d' : 'still';
}

/**
 * Decides whether a figure renders live 3D or its still drawing.
 * - Desktop: 3D.
 * - Phones: 3D only for figures marked `onPhone`, after the page is idle, and not on low-end devices.
 * - Reduced motion or no WebGL: always the still.
 * The server always renders the still, so the page is complete before any JavaScript runs.
 */
export function useFigureMode(onPhone = false): FigureMode {
  return useSyncExternalStore(
    subscribe,
    () => snapshot(onPhone),
    () => 'still'
  );
}

function subscribeCoarse(fn: () => void) {
  const q = matchMedia(COARSE);
  q.addEventListener('change', fn);
  return () => q.removeEventListener('change', fn);
}

/** True on touch-first devices, where a figure must be tapped before dragging turns it. */
export function useCoarsePointer() {
  return useSyncExternalStore(
    subscribeCoarse,
    () => matchMedia(COARSE).matches,
    () => false
  );
}
