import { PopoverContext } from "@/shared/ui"
import { TodoAdd, TodoHeader, TodoList, TodoPagination } from "@/widget"
import { useState } from "react"
import "./HomePage.css"

export function HomePage() {
  const [idPopoverVisible, setIdPopoverVisible] = useState("")

  return (
    <main className="home-page">
      <TodoHeader />
      <PopoverContext.Provider
        value={{ idPopoverVisible, setIdPopoverVisible }}
      >
        <div className="home-page-content">
          <TodoAdd />

          <TodoList />

          <TodoPagination />
        </div>
      </PopoverContext.Provider>
    </main>
  )
}
