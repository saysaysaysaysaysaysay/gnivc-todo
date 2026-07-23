import { Button } from "@/shared/ui"
import "../styles/index.css"

export function TodoButtonsDelete({
  todoTitle,
  onConfirm,
  onCancel,
}: {
  todoTitle: string
  onConfirm: () => void
  onCancel: () => void
}) {
  const showTodoTitle = (title: string) => {
    if (title.length > 40) return todoTitle.slice(0, 33) + "..."
    return title
  }

  return (
    <div className="confirm">
      <p>
        Вы уверены что хотите удалить: <br />
        <strong>{showTodoTitle(todoTitle)}</strong>
      </p>
      <div className="confirm-buttons">
        <Button
          onClick={onConfirm}
          color="red"
        >
          Удалить
        </Button>
        <Button onClick={onCancel}>Отмена</Button>
      </div>
    </div>
  )
}
