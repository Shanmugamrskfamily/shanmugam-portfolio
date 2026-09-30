'use client';

import { View } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';

/**
 * drei's <View> draws each figure inside its own scissor box and never clears
 * the rest of the canvas. Without this, scrolling leaves ghost copies of a
 * figure where it used to be. Priority 0 runs before the views (priority 1).
 */
function ClearEachFrame() {
  useFrame(({ gl }) => {
    gl.setScissorTest(false);
    gl.clear(true, true, true);
  }, 0);
  return null;
}

/**
 * One WebGL canvas for the whole page, fixed behind the content.
 * Every figure renders into its own frame through drei's <View>,
 * so the browser holds a single GPU context however many figures there are.
 */
export default function FigureCanvas() {
  return (
    <Canvas
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      aria-hidden="true"
    >
      <ClearEachFrame />
      <View.Port />
    </Canvas>
  );
}
