import { themeStore } from "@/entities"
import { createContext, useContext } from "react"

const themeContext = createContext(themeStore)

export function useThemeStore() {
  const store = useContext(themeContext)

  if (!store) console.log("Error in theme")

  return store
}

export default themeContext
