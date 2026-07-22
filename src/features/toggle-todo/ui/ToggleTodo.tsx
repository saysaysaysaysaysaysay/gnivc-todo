import { Button } from '@/shared/ui';
import styles from './ToggleTodo.module.scss';
import type { IToggleTodoButtonProps } from './types';
import { observer } from 'mobx-react';
import { useToggleTodo } from '@/entities/todo/hooks/useToggleTodo';

export const ToggleTodo = observer(function ToggleTodo({ todoId, completed }: IToggleTodoButtonProps) {

  const { toggleTodo } = useToggleTodo();

  const handleToggle = async () => {
    await toggleTodo(todoId);
  };

  return (
    <Button
      className={styles['toggle-todo-button']}
      onClick={() => void handleToggle()}
    >
      {completed ? 'В работе' : 'Выполнено'}
    </Button>
  );
});
