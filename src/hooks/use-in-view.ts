import { useEffect, useRef, useState } from 'react';

export function useInViewOnce(options: IntersectionObserverInit = { threshold: 0.2 }) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(el);

    return () => observer.disconnect();
  }, [options, inView]);

  return { ref, inView } as const;
}
