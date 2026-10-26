import React, { useEffect, useRef, useState } from 'react';

export default function AnimatedNumber({ value, decimals = 2 }) {
  const [display, setDisplay] = useState(value);
  const previous = useRef(value);
  useEffect(() => {
    const from = previous.current;
    previous.current = value;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setDisplay(value); return; }
    let frame;
    const start = performance.now();
    const update = now => {
      const progress = Math.min(1, (now - start) / 650);
      setDisplay(from + (value - from) * (1 - (1 - progress) ** 3));
      if (progress < 1) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [value]);
  return <span>{display.toFixed(decimals)}</span>;
}
