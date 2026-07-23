import { useStore } from "@/app/store/baseStore"
import { observer } from "mobx-react"
import { useEffect } from "react"
import { TodoItem } from "../../TodoItem"
import "../styles/index.css"

export const TodoList = observer(() => {
  const { todos, perPage, getAllTodo } = useStore()

  useEffect(() => {
    getAllTodo()
  }, [getAllTodo])

  return (
    <>
      {todos.length === 0 ? (
        <p className="todos__empty">Пока нет задач</p>
      ) : (

          <div
            style={{ height: `${perPage * 32 + (perPage - 1) * 4}px` }}
            className="todos__list"
          >
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
              />
            ))}
          </div>
      )}
    </>
  )
})
