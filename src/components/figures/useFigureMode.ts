'use client';

import { useSyncExternalStore } from 'react';

export type FigureMode = '3d' | 'still';

const STILL_QUERY =
  '(prefers-reduced-motion: reduce), (max-width: 700px), (pointer: coarse) and (max-width: 1024px)';

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

function subscribe(fn: () => void) {
  const mq = matchMedia(STILL_QUERY);
  mq.addEventListener('change', fn);
  return () => mq.removeEventListener('change', fn);
}

/**
 * Phones, reduced-motion visitors and browsers without WebGL get still drawings.
 * The server always renders the still, so the page is complete before any JavaScript runs.
 */
export function useFigureMode(): FigureMode {
  return useSyncExternalStore(
    subscribe,
    () => (matchMedia(STILL_QUERY).matches || !hasWebGL() ? 'still' : '3d'),
    () => 'still'
  );
}
