import type { Popover } from "../types"

export function Popover({
  popoverContent,
  children,
  isVisible,
  setIsVisible,
}: Popover) {
  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      onClick={() => setIsVisible}
    >
      {children}
      {isVisible && (
        <div
          style={{
            position: "absolute",
            bottom: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "12px 16px",
            backgroundColor: "#333",
            color: "#fff",
            borderRadius: "4px",
            wordWrap: "break-word",
            whiteSpace: "normal",
            zIndex: 10,
            minWidth: "200px",
            maxWidth: "350px",
            width: "max-content",
            fontWeight: 600,
            fontSize: "16px",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          {popoverContent}
        </div>
      )}
    </div>
  )
}
