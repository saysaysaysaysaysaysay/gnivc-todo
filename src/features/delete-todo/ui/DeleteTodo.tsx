import { Button } from '@/shared/ui';
import styles from './DeleteTodo.module.scss';
import type { IDeleteTodoProps } from './types';
import { FaTrash } from 'react-icons/fa6';

export const DeleteTodo = function DeleteTodo({ todoId }: IDeleteTodoProps) {
  
  const handleDelete = async () => {
   console.log(`удаляем задачу с id: ${todoId}`)
  };

  return (
    <Button
      htmlType='button'
      variant='delete'
      icon={<FaTrash />}
      className={styles['delete-todo-button']}
      onClick={() => void handleDelete()}
    />
  );
};
