import { useEffect, useState } from 'react';

export function useDeviceHeight() {
  const [height, setHeight] = useState<number>(
    typeof window !== 'undefined' ? window.innerHeight : 0,
  );

  useEffect(() => {
    const handler = () => setHeight(window.innerHeight);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return height;
}
