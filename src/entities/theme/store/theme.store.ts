import { makeAutoObservable } from "mobx"
import { getTheme } from "../api/theme.api"
import type { Theme } from "../types/theme.types"

class ThemeStore {
  theme: Theme = "dark"

  constructor() {
    makeAutoObservable(this)
    const tempTheme = getTheme()
    this.theme = tempTheme === null ? this.getSystemTheme() : tempTheme
    this.applyTheme()
  }

  getSystemTheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  }

  toggle = () => {
    this.theme = this.theme === "light" ? "dark" : "light"
    localStorage.setItem("theme", this.theme)
    this.applyTheme()
  }

  applyTheme = () => {
    document.documentElement.setAttribute("data-theme", this.theme)
    localStorage.setItem("theme", this.theme)
  }
}

export const themeStore = new ThemeStore()
