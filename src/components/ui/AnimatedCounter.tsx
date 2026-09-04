'use client';

import { useEffect, useState } from 'react';

interface Props {
  value: string;
  inView: boolean;
  duration?: number;
}

export default function AnimatedCounter({ value, inView, duration = 1200 }: Props) {
  // Split a value like "2.5+" into its number (2.5) and trailing suffix ("+"),
  // keeping any decimal places so fractional stats animate correctly.
  const match = value.match(/^([\d.]+)(.*)$/);
  const num = match ? parseFloat(match[1]) || 0 : 0;
  const suffix = match ? match[2] : value;
  const decimals = match?.[1].includes('.') ? match[1].split('.')[1].length : 0;

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const totalFrames = Math.round(duration / 16);
    const id = setInterval(() => {
      frame++;
      const ease = 1 - Math.pow(1 - frame / totalFrames, 3);
      setCount(ease * num);
      if (frame >= totalFrames) {
        setCount(num);
        clearInterval(id);
      }
    }, 16);
    return () => clearInterval(id);
  }, [inView, num, duration]);

  return (
    <>
      {count.toFixed(decimals)}
      {suffix}
    </>
  );
}
