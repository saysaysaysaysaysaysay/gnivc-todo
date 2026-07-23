import { useStore } from "@/app/store/baseStore"
import type { Todo } from "@/entities"
import { Checkbox, Input, Tooltip } from "@/shared/ui"
import { observer } from "mobx-react"
import { useCallback, useState } from "react"
import { TodoButtons } from "../../TodoButtons"
import { getFullDate, getHours } from "../lib"
import "../styles/index.scss"

export const TodoItem = observer(({ todo }: { todo: Todo }) => {
  const {
    updateTodo,
    setIdEditTodo,
    idEditTodo,
    removeTodo,
    toggleCompleteTodo,
  } = useStore()
  const [isDeleting, setIsDeleting] = useState(false)
  const [inputVal, setInputVal] = useState(todo.title)

  const handleEditTodo = useCallback(() => {
    const newTodo: Todo = { ...todo }
    newTodo.id = inputVal
    newTodo.title = inputVal
    updateTodo(todo.id, newTodo)
    setIdEditTodo(todo.title)
  }, [updateTodo, setIdEditTodo, inputVal, todo])

  const handleDeleteTodo = useCallback(() => {
    setIsDeleting(true)
    setTimeout(() => {
      removeTodo(todo.id)
      setIsDeleting(false)
    }, 300)
  }, [removeTodo, setIsDeleting, todo])

  return (
    <div className={`todo ${isDeleting ? "todo__deleting" : ""}`}>
      <Checkbox
        disabled={idEditTodo.length > 0}
        checked={todo.completed}
        onChange={() => toggleCompleteTodo(todo)}
      />
      <div className="todo-text">
        {idEditTodo === todo.title ? (
          <Input
            onChange={(e) => setInputVal(e.target.value.trim())}
            value={inputVal}
            maxLength={50}
          />
        ) : (
          <p className="main-text">{todo.title}</p>
        )}
        <Tooltip text={getFullDate(todo.createdAt)}>
          <p className="hours">{getHours(todo.createdAt)}</p>
        </Tooltip>
      </div>
      <TodoButtons
        todo={todo}
        idEditTodo={idEditTodo}
        setIdEditTodo={() => setIdEditTodo(todo.title)}
        handleEditTodo={handleEditTodo}
        handleDeleteTodo={handleDeleteTodo}
      />
    </div>
  )
})
