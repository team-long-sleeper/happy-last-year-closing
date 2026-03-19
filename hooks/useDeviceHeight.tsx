import { useEffect, useState } from 'react';

export function useDeviceHeight() {
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handler = () => setHeight(window.innerHeight);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return height;
}
