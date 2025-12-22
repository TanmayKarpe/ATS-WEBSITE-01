import { useEffect, useRef, useState } from 'react';

interface UseCountUpOptions {
  start?: number;
  end: number;
  duration?: number; // ms
  easing?: (t: number) => number;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function useCountUp({ start = 0, end, duration = 1200, easing = easeOutCubic }: UseCountUpOptions) {
  const [value, setValue] = useState<number>(start);
  const [hasRun, setHasRun] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId: number | null = null;
    let startTime: number | null = null;

    const run = (ts: number) => {
      if (startTime === null) startTime = ts;
      const elapsed = ts - startTime;
      const t = Math.min(1, elapsed / duration);
      const eased = easing(t);
      const nextVal = Math.round(start + (end - start) * eased);
      setValue(nextVal);
      if (t < 1) rafId = requestAnimationFrame(run);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!hasRun && entry.isIntersecting) {
          setHasRun(true);
          rafId = requestAnimationFrame(run);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [start, end, duration, easing, hasRun]);

  return { ref, value } as const;
}
