import { todoStore } from "@/entities/todo/model/store";

export const useToggleTodo = () => {
  return {
    toggleTodo: (id: string) => todoStore.toggleTodo(id),
  };
};
