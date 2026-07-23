import { forwardRef } from "react"
import type { InputProps } from "../types"

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ onChange, value, maxLength, placeholder, ...props }, ref) => {
    return (
      <input
        ref={ref}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
    )
  }
)
