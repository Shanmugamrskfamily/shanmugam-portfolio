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
      className="fixed top-0 left-0 z-[60] h-[3px] rounded-r-full pointer-events-none"
      style={{
        width: `${progress}%`,
        background: 'linear-gradient(90deg, #6c63ff 0%, #ff6b6b 50%, #ffd93d 100%)',
        boxShadow: '0 0 10px rgba(108,99,255,0.6), 0 0 20px rgba(255,107,107,0.3)',
        transition: 'none',
      }}
    />
  );
}
