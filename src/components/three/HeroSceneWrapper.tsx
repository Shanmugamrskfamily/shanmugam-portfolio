'use client';

import dynamic from 'next/dynamic';

function GradientFallback() {
  return (
    <div
      className="absolute -inset-10 sm:-inset-12 lg:-inset-16 -z-0 opacity-30 dark:opacity-40 pointer-events-none"
      style={{
        background: 'radial-gradient(circle at 50% 50%, #6c63ff 0%, transparent 60%)',
      }}
    />
  );
}

const HeroScene = dynamic(() => import('./HeroScene'), {
  ssr: false,
  loading: () => <GradientFallback />,
});

export default function HeroSceneWrapper() {
  return <HeroScene />;
}
