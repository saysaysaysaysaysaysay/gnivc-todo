import { useForm } from 'react-hook-form';
import { Button, Input } from '@/shared/ui';
import styles from './AddTodoForm.module.scss';
import type { IAddTodoFormValues } from './types';
import { observer } from 'mobx-react';
import { useCreateTodo } from '@/entities/todo/hooks/useCreateTodo';

export const AddTodoForm = observer(function AddTodoForm() {
  const { createTodo } = useCreateTodo();

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<IAddTodoFormValues>({
    defaultValues: {
      title: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const onSubmit = async ({ title }: IAddTodoFormValues) => {
    await createTodo(title);
    reset({ title: '' });
  };
  const handleTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (errors.title) {
      clearErrors('title');
    }
    return event.target.value;
  };

  return (
    <form className={styles['add-todo-form']} onSubmit={handleSubmit(onSubmit)}>
      <Input
        placeholder='Что планируете добавить?'
        label='Название задачи'
        error={errors.title?.message}
         {...register('title', {
            onChange: (event) => {
              handleTitleInput(event);
            },
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