import { useState, useEffect } from 'react';

export type IndiaColor = {
  primary: string;
  light: string;
  background: string;
  name: string;
};

const INDIA_COLORS: IndiaColor[] = [
  { primary: '#FFFFFF', light: '#FFFFFF', background: '#FFFFFF', name: 'white' },
  { primary: '#FF9933', light: '#FF9933', background: '#FFF4E6', name: 'saffron' },
  { primary: '#138808', light: '#138808', background: '#F0F8EF', name: 'green' },
];

export function useIndiaColors() {
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % INDIA_COLORS.length);
    }, 10000); // Change every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return INDIA_COLORS[colorIndex];
}