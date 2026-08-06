'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ScrollAnimations() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const triggers = gsap.utils.toArray<HTMLElement>('.blob').map((layer, i) =>
      gsap.to(layer, {
        yPercent: (i % 3) * -6 - 6,
        ease: 'none',
        scrollTrigger: {
          trigger: layer.parentElement ?? layer,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      })
    );

    return () => {
      triggers.forEach((t) => t.scrollTrigger?.kill());
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}
