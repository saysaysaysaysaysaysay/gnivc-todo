import { Button } from '@/shared/ui';
import styles from './ToggleTodo.module.scss';
import type { IToggleTodoButtonProps } from './types';
import { todoStore } from '@/entities/todo';
import { observer } from 'mobx-react';

export const ToggleTodo = observer(function ToggleTodo({ todoId, completed }: IToggleTodoButtonProps) {
  const handleToggle = async () => {
    await todoStore.toggleTodo(todoId);
  };

  return (
    <Button
      htmlType='button'
      variant='default'
      className={styles['toggle-todo-button']}
      onClick={() => void handleToggle()}
    >
      {completed ? 'В работе' : 'Выполнено'}
    </Button>
  );
});
