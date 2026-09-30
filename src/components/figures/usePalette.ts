'use client';

import { useEffect, useState } from 'react';
import { readPalette, type Palette } from './three-kit';

/** Re-reads the theme palette whenever the theme attribute or OS scheme changes. */
export function usePalette(): Palette {
  const [palette, setPalette] = useState<Palette>(() => readPalette());
  useEffect(() => {
    const update = () => setPalette(readPalette());
    const mq = matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', update);
    const mo = new MutationObserver(update);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
    });
    return () => {
      mq.removeEventListener('change', update);
      mo.disconnect();
    };
  }, []);
  return palette;
}
