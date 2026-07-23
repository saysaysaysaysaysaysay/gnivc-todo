import type { ReactNode } from "react"

export interface Select {
  children: ReactNode
  defaultValue?: string | number
  width?: number
  onChange: (per: string | number) => void | Promise<void>
}
