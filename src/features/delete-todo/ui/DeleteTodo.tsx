import { Button } from '@/shared/ui';
import styles from './DeleteTodo.module.scss';
import type { IDeleteTodoProps } from './types';
import { FaTrash } from 'react-icons/fa6';
import { todoStore } from '@/entities/todo';
import { observer } from 'mobx-react';

export const DeleteTodo = observer(function DeleteTodo({ todoId }: IDeleteTodoProps) {
  
  const handleDelete = async () => {
    await todoStore.deleteTodo(todoId);
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
});
