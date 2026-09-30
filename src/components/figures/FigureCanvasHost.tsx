'use client';

import dynamic from 'next/dynamic';
import { useFigureMode } from './useFigureMode';

const FigureCanvas = dynamic(() => import('./FigureCanvas'), { ssr: false });

/** Loads three.js only for visitors who get at least one 3D figure (the hero also runs on capable phones). */
export default function FigureCanvasHost() {
  return useFigureMode(true) === '3d' ? <FigureCanvas /> : null;
}
