import { useState } from "react"
import type { Tooltip } from "../types"

export function Tooltip({ text, children }: Tooltip) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          style={{
            position: "absolute",
            bottom: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "8px",
            backgroundColor: "#333",
            color: "#fff",
            borderRadius: "4px",
            wordWrap: "break-word",
            whiteSpace: "normal",
            zIndex: 10,
            fontWeight: 600,
            fontSize: "16px",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          {text}
        </div>
      )}
    </div>
  )
}
