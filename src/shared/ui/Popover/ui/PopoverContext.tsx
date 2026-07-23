import { createContext } from "react"
import type { PopoverContextType } from "../types"

export const PopoverContext = createContext<PopoverContextType>({
  idPopoverVisible: "",
  setIdPopoverVisible: () => {},
})
