'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const total = scrollHeight - clientHeight;
      setProgress(total > 0 ? (scrollTop / total) * 100 : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 z-[70] h-[3px] pointer-events-none"
      style={{
        width: `${progress}%`,
        background: 'var(--gradient-primary)',
        boxShadow: '0 0 8px var(--color-primary)',
        transition: 'width 0.08s linear',
      }}
    />
  );
}
