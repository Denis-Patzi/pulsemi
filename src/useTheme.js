import { useEffect, useState } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('pulse-theme'));
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {}
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    try { localStorage.setItem('pulse-theme', JSON.stringify(theme)); } catch {}
  }, [theme]);
  return [theme, () => setTheme(value => value === 'dark' ? 'light' : 'dark')];
}
