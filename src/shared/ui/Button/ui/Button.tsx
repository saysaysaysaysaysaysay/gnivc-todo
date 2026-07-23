import "../styles/Button.css"
import type { Button } from "../types"

export function Button({
  color = "blue",
  type,
  children,
  size,
  disabled,
  onClick,
}: Button) {
  const cursorPointer = () => {
    return disabled ? { cursor: "not-allowed" } : { cursor: "pointer" }
  }

  const colorButton = () => {
    if (color === "green") return { backgroundColor: "#40c057" }
    else if (color === "blue") return { backgroundColor: "#1668dc" }
    else if (color === "black") return { backgroundColor: "black" }
    else if (color === "white") return { backgroundColor: "white" }
    else return { backgroundColor: "#dc4446" }
  }

  const sizeButton = () => {
    return size === "small" ? { height: "32px", width: "32px" } : {}
  }

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className="base-button"
      style={{ ...colorButton(), ...sizeButton(), ...cursorPointer() }}
    >
      {children}
    </button>
  )
}
