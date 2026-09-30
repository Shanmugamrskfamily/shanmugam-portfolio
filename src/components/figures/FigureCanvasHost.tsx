'use client';

import dynamic from 'next/dynamic';
import { useFigureMode } from './useFigureMode';

const FigureCanvas = dynamic(() => import('./FigureCanvas'), { ssr: false });

/** Loads three.js only for visitors who get the 3D figures. */
export default function FigureCanvasHost() {
  return useFigureMode() === '3d' ? <FigureCanvas /> : null;
}
