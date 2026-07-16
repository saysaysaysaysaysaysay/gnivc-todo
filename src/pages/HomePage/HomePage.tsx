import { todoStore } from '@/entities/todo'
import './HomePage.css'
import { AddTodoForm } from '@/features'
import { TodoList } from '@/widgets'
import { observer } from 'mobx-react'
import { useEffect } from 'react'


export const HomePage = observer( function HomePage() {
  useEffect(() => {
    void todoStore.loadTodos()
  }, [])
  return (
    <main className='home-page'>
      <h1>Todo</h1>
      <AddTodoForm></AddTodoForm>
      <TodoList todos={todoStore.todos}></TodoList>
    </main>
  )
})
