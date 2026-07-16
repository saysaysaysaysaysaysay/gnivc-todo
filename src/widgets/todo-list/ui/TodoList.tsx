import styles from './TodoList.module.scss';
import type { ITodoListProps } from './types';
import { TodoItem } from '@/features';

export function TodoList({ todos }: ITodoListProps) {
  
  if (todos.length === 0) {
    return <p className={styles['todo-list__empty']}>Пока нет задач</p>;
  }

  return (
    <ul className={styles['todo-list']}>
      {todos.map((todo) => (
        <li key={todo.id} className={styles['todo-list__item']}>
          <TodoItem todo={todo} />
        </li>
      ))}
    </ul>
  );
}
