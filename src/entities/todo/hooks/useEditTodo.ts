import { todoStore } from "@/entities/todo/model/store";

export const useEditTodo = () => {
  return {
    editTodo: (id: string, title: string) => todoStore.renameTodo(id, title),
  };
};
