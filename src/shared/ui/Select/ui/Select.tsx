import type { Select } from "../types"

export function Select({ children, defaultValue, width, onChange }: Select) {
  return (
    <select
      defaultValue={defaultValue}
      onChange={(e) => onChange(e.target.value)}
      style={{ width: `${width}px` }}
    >
      {children}
    </select>
  )
}
