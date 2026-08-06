'use client';

import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { useTheme } from 'next-themes';
import type { Group } from 'three';

const THEME_COLORS = {
  light: { primary: '#6c63ff', teal: '#4ecdc4' },
  dark: { primary: '#8b83ff', teal: '#5ee8df' },
} as const;

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

function useThemeColors() {
  const { resolvedTheme } = useTheme();
  return resolvedTheme === 'light' ? THEME_COLORS.light : THEME_COLORS.dark;
}

function CanvasSizer() {
  const { gl } = useThree();
  useEffect(() => {
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }, [gl]);
  return null;
}

function WireframePolyhedron({ reduced }: { reduced: boolean }) {
  const groupRef = useRef<Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const colors = useThemeColors();

  useEffect(() => {
    if (reduced) return;
    const handleMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [reduced]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (!reduced) {
      groupRef.current.rotation.y += delta * 0.12;
      groupRef.current.rotation.x += delta * 0.04;
      groupRef.current.rotation.y += mouse.current.x * delta * 0.15;
      groupRef.current.rotation.x += mouse.current.y * delta * 0.08;
    }
  });

  return (
    <Float
      speed={reduced ? 0 : 1.1}
      rotationIntensity={reduced ? 0 : 0.15}
      floatIntensity={reduced ? 0 : 0.5}
    >
      <group ref={groupRef} position={[0, 0, 0]}>
        {/* Faint solid fill for depth */}
        <mesh>
          <icosahedronGeometry args={[2.6, 1]} />
          <meshStandardMaterial
            color={colors.primary}
            transparent
            opacity={0.09}
            roughness={0.9}
            metalness={0}
          />
        </mesh>
        {/* Clean low-poly wireframe — large, wrapping well beyond the photo */}
        <mesh>
          <icosahedronGeometry args={[2.6, 1]} />
          <meshBasicMaterial color={colors.primary} wireframe transparent opacity={0.85} />
        </mesh>
        {/* Secondary inner accent shell */}
        <mesh rotation={[0.4, 0.6, 0]}>
          <icosahedronGeometry args={[1.9, 0]} />
          <meshBasicMaterial color={colors.teal} wireframe transparent opacity={0.6} />
        </mesh>
      </group>
    </Float>
  );
}

export default function HeroScene() {
  const reduced = useReducedMotion();

  return (
    <div
      className="absolute -inset-16 sm:-inset-24 lg:-inset-32 -z-0 pointer-events-none"
      role="img"
      aria-label="Large animated wireframe geometric shape surrounding the profile photo"
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
      >
        <CanvasSizer />
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          <WireframePolyhedron reduced={reduced} />
        </Suspense>
      </Canvas>
    </div>
  );
}
