'use client';

import { useEffect, useState } from 'react';

interface Props {
  value: string;
  inView: boolean;
  duration?: number;
}

export default function AnimatedCounter({ value, inView, duration = 1200 }: Props) {
  const num = parseInt(value.replace(/\D/g, ''), 10) || 0;
  const suffix = value.replace(/\d/g, '');
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const totalFrames = Math.round(duration / 16);
    const id = setInterval(() => {
      frame++;
      const ease = 1 - Math.pow(1 - frame / totalFrames, 3);
      setCount(Math.round(ease * num));
      if (frame >= totalFrames) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [inView, num, duration]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
}
