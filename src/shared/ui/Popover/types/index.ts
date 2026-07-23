import type { ReactNode } from "react"

export interface Popover {
  popoverContent: ReactNode
  children: ReactNode
  isVisible: boolean
  setIsVisible: (val: string) => void
}

export interface PopoverContextType {
  idPopoverVisible: string
  setIdPopoverVisible: (id: string) => void
}