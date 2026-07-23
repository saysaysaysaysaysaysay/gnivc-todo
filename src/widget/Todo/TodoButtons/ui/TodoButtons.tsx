import type { Todo } from "@/entities"
import { Button, Popover, PopoverContext } from "@/shared/ui"
import { Check, SquarePen, Trash, X } from "lucide-react"
import { useContext } from "react"
import { TodoButtonsDelete } from "./TodoButtonsDelete"

interface TodoButtons {
  todo: Todo
  idEditTodo: string
  setIdEditTodo: () => void
  handleEditTodo: () => void
  handleDeleteTodo: () => void
}

export const TodoButtons = ({
  todo,
  idEditTodo,
  setIdEditTodo,
  handleEditTodo,
  handleDeleteTodo
}: TodoButtons) => {
  const { idPopoverVisible, setIdPopoverVisible } = useContext(PopoverContext)

  return (
    <div className="todo-buttons">
      {idEditTodo === todo.title ? (
        <>
          <Button
            size="small"
            color="green"
            onClick={() => handleEditTodo()}
          >
            <Check />
          </Button>
          <Button
            size="small"
            onClick={setIdEditTodo}
            color="red"
          >
            <X />
          </Button>
        </>
      ) : (
        <>
          <Button
            size="small"
            color="blue"
            disabled={idEditTodo.length > 0 && idEditTodo !== todo.title}
            onClick={setIdEditTodo}
          >
            <SquarePen />
          </Button>
          <Popover
            isVisible={idPopoverVisible === todo.title}
            setIsVisible={() => setIdPopoverVisible(todo.title)}
            popoverContent={
              <TodoButtonsDelete
                todoTitle={todo.title}
                onConfirm={() => {
                  handleDeleteTodo()
                  setIdPopoverVisible("")
                }}
                onCancel={() => setIdPopoverVisible("")}
              />
            }
          >
            <Button
              disabled={idEditTodo.length > 0}
              size="small"
              onClick={() => setIdPopoverVisible(todo.title)}
              color="red"
            >
              <Trash />
            </Button>
          </Popover>
        </>
      )}
    </div>
  )
}
