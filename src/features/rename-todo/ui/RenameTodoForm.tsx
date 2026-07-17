import { observer } from "mobx-react";
import type { IRenameTodoFormProps, IRenameTodoFormValues } from "./types";
import { useForm } from "react-hook-form";
import { todoStore } from "@/entities/todo";
import { Button, Input } from "@/shared/ui";
import styles from "./RenameTodoForm.module.scss";
import { useEffect } from "react";
import { FaCheck, FaX  } from "react-icons/fa6";

export const RenameTodoForm = observer(function RenameTodoForm({ 
  todoId, 
  currentTitle,
  onClose,
}: IRenameTodoFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IRenameTodoFormValues>({
    defaultValues: {
      title: currentTitle,
    },
    mode: 'onChange',
  });

  useEffect(() => {
    reset({ title: currentTitle });
  }, [currentTitle, reset]);

  const onSubmit = async ({ title }: IRenameTodoFormValues) => {
    await todoStore.renameTodo(todoId, title); 
    reset({ title: title });
    onClose?.();
  };


  const handleCancel = () => {
    reset({ title: currentTitle });
    onClose?.();
  };

  return (
    <>
      <form className={styles['rename-todo-form']} onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder='Введите новое название'
          error={errors.title?.message}
          autoFocus
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
        <div className={styles['rename-todo-form__actions']}>
          <Button htmlType='submit' variant='primary' className={styles['rename-todo-form__button']}>
              <FaCheck />
          </Button>
          <Button onClick={handleCancel} className={styles['rename-todo-form__button']}>
            <FaX />
          </Button>
        </div>
      </form>
    </>
  );
});