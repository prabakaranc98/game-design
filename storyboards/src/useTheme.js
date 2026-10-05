import { useCallback, useEffect, useState } from 'react';

const THEME_KEY = 'storyboard-theme';

const stored = () => {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch {
    return null;
  }
};

// Light/dark: follows the system until the viewer picks one, then remembers it.
export function useTheme() {
  const [theme, setTheme] = useState(stored);
  const [systemDark, setSystemDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e) => setSystemDark(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme) root.dataset.theme = theme;
    else delete root.dataset.theme;
    try {
      if (theme) localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* storage unavailable: the theme still applies for this visit */
    }
  }, [theme]);

  const resolved = theme ?? (systemDark ? 'dark' : 'light');
  const toggle = useCallback(() => setTheme(resolved === 'dark' ? 'light' : 'dark'), [resolved]);
  return { resolved, toggle };
}
