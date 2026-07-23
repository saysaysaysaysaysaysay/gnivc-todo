import "../styles/Checkbox.css"
import type { Checkbox } from "../types"

export function Checkbox({
  checked,
  size = "medium",
  disabled,
  onChange,
}: Checkbox) {
  const cursorPointer = () => {
    return disabled ? { cursor: "not-allowed" } : { cursor: "pointer" }
  }

  return (
    <input
      disabled={disabled}
      checked={checked}
      className={size}
      onChange={onChange}
      style={{ width: "fit-content", ...cursorPointer() }}
      type="checkbox"
    ></input>
  )
}
