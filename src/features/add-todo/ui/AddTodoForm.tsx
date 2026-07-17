import { useForm } from 'react-hook-form';
import { Button, Input } from '@/shared/ui';
import styles from './AddTodoForm.module.scss';
import type { IAddTodoFormValues } from './types';
import { todoStore } from '@/entities/todo';
import { observer } from 'mobx-react';

export const AddTodoForm = observer(function AddTodoForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAddTodoFormValues>({
    defaultValues: {
      title: '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = async ({ title }: IAddTodoFormValues) => {
    await todoStore.addTodo(title);
    reset({ title: '' });
  };

  return (
    <form className={styles['add-todo-form']} onSubmit={handleSubmit(onSubmit)}>
      <Input
        placeholder='Что планируете добавить?'
        label='Название задачи'
        error={errors.title?.message}
        {...register('title', {
          required: 'Введите название задачи',
          validate: (value) => {
            const trimmed = value.trim();
            if (!trimmed) return 'Название не может быть пустым';
            if (trimmed.length > 100) {
              return 'Название должно быть не длиннее 100 символов';
            }
            return true;
          },
        })}
      />
      {!errors.title && <div className={styles['empty-div']}></div>}
      <div></div>
      <Button htmlType='submit' variant='primary'>
        {'Добавить'}
      </Button>
    </form>
  );
});