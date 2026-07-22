
import './HomePage.css'
import { AddTodoForm, ToggleTheme } from '@/features'
import { TodoList } from '@/widgets'
import { observer } from 'mobx-react'


export const HomePage = observer( function HomePage() {
  
  return (
    <main className='home-page'>
      <div className='home-page-header'>
        <h1>Todo</h1>
        <ToggleTheme />
      </div>
      <AddTodoForm></AddTodoForm>
      <TodoList></TodoList>
      
    </main>
  )
})
