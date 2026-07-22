import type { ITodoItemProps } from './types';
import { ToggleTodo } from '@/features/toggle-todo';
import { DeleteTodo } from '@/features/delete-todo';
import clsx from 'clsx';
import styles from './TodoItem.module.scss';
import { formatTodoDate, formatTodoDateFull } from '@/shared/utils';
import { observer } from 'mobx-react';
import { EditTodoForm } from '@/features/edit-todo';
import { Button } from '@/shared/ui';
import { FaPen } from "react-icons/fa";
import { todoStore } from '@/entities/todo/model/store';

export const TodoItem = observer(function TodoItem({
  todo,
  className,
}: ITodoItemProps) {
  const { id, title, completed, createdAt } = todo;
  const isEditing = todoStore.editingTodoId === id;

  const handleToggleEditing = () => {
    todoStore.setEditingTodo(isEditing ? null : id);
  };

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
          <EditTodoForm
            todoId={id}
            currentTitle={title}
            onClose={handleToggleEditing}
          />
        ) : (
          <h2 className={styles['todo-item__title']} title={title}>
            {title}
          </h2>
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
        <div className={styles['todo-item__actions-row']}>
          <Button onClick={handleToggleEditing} className={styles['todo-item__edit-button']}>
            <FaPen />
          </Button>
          <DeleteTodo todoId={id} />
        </div>
        <ToggleTodo todoId={id} completed={completed} />
      </div>
    </div>
  );
});