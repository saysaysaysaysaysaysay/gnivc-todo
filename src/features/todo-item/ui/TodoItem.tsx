import type { ITodoItemProps } from './types';
import { ToggleTodo } from '@/features/toggle-todo';
import { DeleteTodo } from '@/features/delete-todo';
import clsx from 'clsx';
import styles from './TodoItem.module.scss';
import { formatTodoDate } from '@/shared/utility';

export function TodoItem({ todo, className }: ITodoItemProps) {
  
  const { id, title, completed, createdAt } = todo;

  return (
    <div
      className={clsx(
        styles['todo-item'],
        {
          [styles['todo-item--completed']]: completed,
        },
        className
      )}
    >
      <div className={styles['todo-item__content']}>
        <span className={styles['todo-item__title']}>{title}</span>
        <div className={styles['todo-item__meta']}>
          <span className={styles['todo-item__status']}>
            {completed ? 'Выполнено' : 'В работе'}
          </span>
          <span className={styles['todo-item__date']}>
           {`Создано ${formatTodoDate(createdAt)}`}
          </span>
        </div>
      </div>
      <div className={styles['todo-item__actions']}>
        <DeleteTodo todoId={id} />
        <ToggleTodo todoId={id} completed={completed} />
      </div>
    </div>
  );
}
