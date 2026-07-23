import { useStore } from "@/app/store/baseStore"
import { Button, Input } from "@/shared/ui"
import { ArrowDownWideNarrow, ArrowUpNarrowWide } from "lucide-react"
import { observer } from "mobx-react"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import "../styles/index.css"

export const TodoAdd = observer(() => {
  const [isSorted, setSorted] = useState(false)
  const { addTodo, error, sortTodo } = useStore()
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<{ title: string }>()

  const handleAddTodo = (title: string) => {
    if (title.trim().length === 0) return
    addTodo(title.trim())
    reset()
  }

  const handleSortTodo = useCallback(() => {
    setSorted((prev) => !prev)
    return sortTodo(!isSorted)
  }, [setSorted, isSorted, sortTodo])

  useEffect(() => {
    if (error && error.length > 0) setError("title", { message: error })
  }, [error, setError])

  return (
    <div className="todo-add">
      <div className="todo-add-block">
        <form
          onSubmit={handleSubmit((data) => handleAddTodo(data.title.trim()))}
          className="todo-add-block-form"
        >
          <Input
            placeholder="Введите название задачи..."
            maxLength={50}
            {...register("title")}
          />
          <Button type="submit">Добавить</Button>
        </form>
        <Button onClick={handleSortTodo}>
          {isSorted ? <ArrowDownWideNarrow /> : <ArrowUpNarrowWide />}
        </Button>
      </div>
      {errors.title?.message && (
        <p className="error">{errors.title?.message}</p>
      )}
    </div>
  )
})
