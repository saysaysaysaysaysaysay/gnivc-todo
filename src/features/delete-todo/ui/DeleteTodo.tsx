import { useState } from 'react';
import { Button } from '@/shared/ui';
import styles from './DeleteTodo.module.scss';
import type { IDeleteTodoProps } from './types';
import { FaTrash } from 'react-icons/fa6';
import { todoStore } from '@/entities/todo';
import { observer } from 'mobx-react';
import { ConfirmationPopup } from '@/features/pop-up';

export const DeleteTodo = observer(function DeleteTodo({ todoId }: IDeleteTodoProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleDelete = async () => {
    await todoStore.deleteTodo(todoId);
    setIsPopupOpen(!isPopupOpen);
  };

  const handleClick = () => { 
    setIsPopupOpen(!isPopupOpen)
  }

  return (
    <>
      <Button
        variant='delete'
        icon={<FaTrash />}
        className={styles['delete-todo-button']}
        onClick={handleClick}
      />

      <ConfirmationPopup
        isOpen={isPopupOpen}
        title='Удалить задачу?'
        message='Это действие нельзя будет отменить.'
        onConfirm={() => void handleDelete()}
        onCancel={handleClick}
      />
    </>
  );
});