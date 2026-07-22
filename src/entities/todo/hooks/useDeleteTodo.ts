import { todoStore } from "@/entities/todo/model/store";

export const useDeleteTodo = () => {
  return {
    deleteTodo: (id: string) => todoStore.deleteTodo(id),
  };
};
