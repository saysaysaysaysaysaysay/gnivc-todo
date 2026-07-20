import { observer } from "mobx-react";
import type { IEditTodoFormProps,  IEditTodoFormValues } from "./types";
import { useForm } from "react-hook-form";
import { todoStore } from "@/entities/todo";
import { Button, Input } from "@/shared/ui";
import styles from "./EditTodoForm.module.scss";
import { useEffect } from "react";
import { FaCheck, FaX  } from "react-icons/fa6";

export const EditTodoForm = observer(function EditTodoForm({ 
  todoId, 
  currentTitle,
  onClose,
}: IEditTodoFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<IEditTodoFormValues>({
    defaultValues: {
      title: currentTitle,
    },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  useEffect(() => {
    reset({ title: currentTitle });
  }, [currentTitle, reset]);

  const onSubmit = async ({ title }: IEditTodoFormValues) => {
    await todoStore.renameTodo(todoId, title); 
    reset({ title: title });
    onClose?.();
  };


  const handleCancel = () => {
    reset({ title: currentTitle });
    onClose?.();
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (errors.title) {
      clearErrors('title');
    }
    return event.target.value;
  };

  return (
    <>
      <form className={styles['edit-todo-form']} onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder='Введите новое название'
          error={errors.title?.message}
          autoFocus
          {...register('title', {
            onChange: (event) => {
              handleTitleChange(event);
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
        <div className={styles['edit-todo-form__actions']}>
          <Button htmlType="submit" variant='primary' className={styles['edit-todo-form__button']}>
              <FaCheck />
          </Button>
          <Button onClick={handleCancel} className={styles['edit-todo-form__button']}>
            <FaX />
          </Button>
        </div>
      </form>
    </>
  );
});