import { useStore } from "@/app/store/baseStore"
import { Button, PopoverContext, Select } from "@/shared/ui"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { observer } from "mobx-react"
import { useCallback, useContext, useMemo } from "react"
import "../styles/index.css"

export const TodoPagination = observer(() => {
  const { page, perPage, pages, allCountTodo, idEditTodo, getAllTodo, setIdEditTodo } =
    useStore()
  const { setIdPopoverVisible } = useContext(PopoverContext)

  const handleGetAllTodo = useCallback(
    (page: number, perPage: number) => {
      if (idEditTodo.length > 0) setIdEditTodo("")
      getAllTodo(page, perPage)
    },
    [getAllTodo, idEditTodo, setIdEditTodo]
  )

  const countPages = useMemo(() => {
    const arr: number[] = []

    for (let i = 1; i <= pages; i++) {
      arr.push(i)
    }

    return arr.map((item) => (
      <Button
        onClick={() => {
          handleGetAllTodo(item, perPage)
          setIdPopoverVisible("")
        }}
        color={page === item ? "green" : "blue"}
        key={item}
        size="small"
      >
        {item}
      </Button>
    ))
  }, [pages, page, setIdPopoverVisible, handleGetAllTodo, perPage])

  return (
    <>
      {allCountTodo !== 0 && (
        <div className="pagination">
          <Select
            defaultValue={10}
            onChange={(per: string | number) => {
              handleGetAllTodo(1, Number(per))
              setIdPopoverVisible("")
            }}
            width={150}
          >
            {[5, 10, 15].map((item) => (
              <option
                value={item}
                label={`${item}`}
                key={item}
              ></option>
            ))}
          </Select>
          <div className="pagination-pages">
            <Button
              disabled={page - 1 === 0}
              onClick={() => {
                handleGetAllTodo(page - 1, perPage)
                setIdPopoverVisible("")
              }}
            >
              <ArrowLeft />
            </Button>
            {countPages}
            <Button
              disabled={page === pages}
              onClick={() => {
                handleGetAllTodo(page + 1, perPage)
                setIdPopoverVisible("")
              }}
            >
              <ArrowRight />
            </Button>
          </div>
        </div>
      )}
    </>
  )
})
