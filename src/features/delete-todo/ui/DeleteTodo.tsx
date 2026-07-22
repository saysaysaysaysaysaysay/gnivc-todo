import { useState } from 'react';
import { Button } from '@/shared/ui';
import styles from './DeleteTodo.module.scss';
import type { IDeleteTodoProps } from './types';
import { FaTrash } from 'react-icons/fa6';
import { observer } from 'mobx-react';
import { Popup } from '@/shared/ui';
import { useDeleteTodo } from '@/entities/todo/hooks/useDeleteTodo';

export const DeleteTodo = observer(function DeleteTodo({ todoId }: IDeleteTodoProps) {
  const { deleteTodo } = useDeleteTodo();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleDelete = async () => {
    await deleteTodo(todoId);
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

      <Popup
        isOpen={isPopupOpen}
        title='Удалить задачу?'
        message='Это действие нельзя будет отменить.'
        confirmMessage = {<><FaTrash /> Подтвердить</>}
        cancelMessage = 'Оставить'
        backdropClick = {false}
        onConfirm={() => void handleDelete()}
        onCancel={handleClick}
      />
    </>
  );
});