import { todoStore } from "@/entities/todo/model/store";

export const useCreateTodo = () => {
  return {
    createTodo: (title: string) => todoStore.addTodo(title),
  };
};
