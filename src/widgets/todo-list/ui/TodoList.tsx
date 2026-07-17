import styles from './TodoList.module.scss';
import type { ITodoListProps } from './types';
import { TodoItem } from '@/features/todo-item';
import { useState } from 'react';


export function TodoList({ todos }: ITodoListProps) {
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);

  const activeTodoExists = todos.find((todo) => todo.id === editingTodoId);

  if (!activeTodoExists && editingTodoId) {
    setEditingTodoId(null);
  }

  const handleToggleEdit = (todoId: string) => {
    if (editingTodoId === todoId) {
      setEditingTodoId(null);
      return;
    }

    if (editingTodoId && editingTodoId !== todoId) {
      const shouldCancel = window.confirm('Вы уверены, что хотите отменить редактирование текущей задачи?');
      if (!shouldCancel) {
        return;
      }
    }

    setEditingTodoId(todoId);
  };

  if (todos.length === 0) {
    return <p className={styles['todo-list__empty']}>Пока нет задач</p>;
  }

  return (
    <ul className={styles['todo-list']}>
      {todos.map((todo) => (
        <li key={todo.id} className={styles['todo-list__item']}>
          <TodoItem
            todo={todo}
            isEditing={editingTodoId === todo.id}
            onToggleEdit={() => handleToggleEdit(todo.id)}
          />
        </li>
      ))}
    </ul>
  );
}
