import type { Todo } from '@/entities/todo'
import './HomePage.css'

const todos: Todo[] = []

export function HomePage() {
  return (
    <main className="home-page">
      <h1>Todo</h1>

      {todos.length === 0 ? (
        <p className="home-page__empty">Пока нет задач</p>
      ) : (
        <ul className="home-page__list">
          {todos.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      )}
    </main>
  )
}
