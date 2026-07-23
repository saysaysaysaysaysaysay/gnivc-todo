import { useStore } from "@/app/store/baseStore"
import { useThemeStore } from "@/app/store/themeStore"
import { Button } from "@/shared/ui"
import { Moon, Sun } from "lucide-react"
import { observer } from "mobx-react"

export const TodoHeader = observer(() => {
  const { allCountTodo } = useStore()
  const { toggle, theme } = useThemeStore()

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", gap: "8px" }}>
        <h1>Todo</h1>
        <Button
          size="small"
          color={theme === "light" ? "black" : "white"}
          onClick={toggle}
        >
          {theme === "light" ? (
            <Moon
              color="white"
              size={36}
            />
          ) : (
            <Sun color="black" />
          )}
        </Button>
      </div>
      <p>Общее количество задач: {allCountTodo}</p>
    </div>
  )
})
