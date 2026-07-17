import { todoStore } from '@/entities/todo'
import './HomePage.css'
import { AddTodoForm, ToggleTheme } from '@/features'
import { TodoList } from '@/widgets'
import { observer } from 'mobx-react'
import { useEffect } from 'react'


export const HomePage = observer( function HomePage() {
  useEffect(() => {
   todoStore.loadTodos()
  }, [])
  return (
    <main className='home-page'>
      <div className='home-page-header'>
        <h1>Todo</h1>
        <ToggleTheme />
      </div>
      <AddTodoForm></AddTodoForm>
      <TodoList todos={todoStore.todos}></TodoList>
      
    </main>
  )
})
