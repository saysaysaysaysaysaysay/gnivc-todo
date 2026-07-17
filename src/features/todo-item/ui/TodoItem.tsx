import type { ITodoItemProps } from './types';
import { ToggleTodo } from '@/features/toggle-todo';
import { DeleteTodo } from '@/features/delete-todo';
import clsx from 'clsx';
import styles from './TodoItem.module.scss';
import { formatTodoDate, formatTodoDateFull } from '@/shared/utils';
import { observer } from 'mobx-react';
import { RenameTodoForm } from '@/features/rename-todo';
import { Button } from '@/shared/ui';
import { FaPen } from "react-icons/fa";

export const TodoItem = observer(function TodoItem({
  todo,
  className,
  isEditing = false,
  onToggleEdit,
}: ITodoItemProps) {
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
        {isEditing ? (
          <RenameTodoForm
            todoId={id}
            currentTitle={title}
            onClose={onToggleEdit}
          />
        ) : (
          <div className={styles['todo-item__header']}>
            <h2 className={styles['todo-item__title']} title={title}>
              {title}
            </h2>
            <Button onClick={onToggleEdit} className={styles['todo-item__edit-button']}>
              <FaPen />
            </Button>
          </div>
        )}

        <div className={styles['todo-item__meta']}>
          <span className={styles['todo-item__status']}>
            {completed ? 'Выполнено' : 'В работе'}
          </span>
          <span className={styles['todo-item__date']} title={formatTodoDateFull(createdAt)}>
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
});
