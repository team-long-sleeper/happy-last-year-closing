import { useState, useEffect, useRef } from 'react';

interface AnimatedCountProps {
  target: number;
  duration?: number;
}

export default function AnimatedCount({ target, duration = 1000 }: AnimatedCountProps) {
  const [count, setCount] = useState(0);
  const prevTarget = useRef(0);

  useEffect(() => {
    const start = prevTarget.current;
    const diff = target - start;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(start + diff * eased));

      if (progress < 1) requestAnimationFrame(animate);
      else prevTarget.current = target;
    };

    requestAnimationFrame(animate);
  }, [target, duration]);

  return <span>{count}</span>;
}
