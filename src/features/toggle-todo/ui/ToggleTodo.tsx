import { Button } from '@/shared/ui';
import styles from './ToggleTodo.module.scss';
import type { IToggleTodoButtonProps } from './types';

export function ToggleTodo({ todoId, completed }: IToggleTodoButtonProps) {
  const handleToggle = async () => {
    console.log(`меняем статус задачи с id: ${todoId}`)
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
};
