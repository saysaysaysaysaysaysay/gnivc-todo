import type { ReactNode } from "react"

export interface Button {
  color?: "blue" | "red" | "green" | "black" | "white"
  text?: string
  type?: "submit" | "reset" | "button"
  onClick?: () => void
  size?: "small"
  disabled?: boolean
  children?: ReactNode
}
