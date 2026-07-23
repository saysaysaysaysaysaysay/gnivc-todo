import type { Theme } from "../types/theme.types"

export function getTheme(): Theme | null {
  const response = localStorage.getItem("theme")
  if (response !== null) return localStorage.getItem("theme") as Theme
  return null
}

export function setTheme(theme: Theme) {
  localStorage.setItem("theme", theme)
}
