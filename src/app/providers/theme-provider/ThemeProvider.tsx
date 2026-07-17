import { useEffect, useMemo, useState } from 'react'
import type { Theme } from './types'
import { ThemeContext } from './ThemeContext';


const THEME_STORAGE_KEY = 'gnivc-todo-theme'

function getInitialTheme(): Theme {
  let theme = localStorage.getItem(THEME_STORAGE_KEY);

  if (!theme) {
    localStorage.setItem(THEME_STORAGE_KEY, 'light');
    theme = 'light';
  }
  return theme as Theme;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

   useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  const value = useMemo(() => ({ theme, toggleTheme }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
