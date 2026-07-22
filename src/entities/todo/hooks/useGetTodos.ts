import { useEffect } from "react";
import { todoStore } from "@/entities/todo/model/store";

export const useGetTodos = () => {
  useEffect(() => {
    todoStore.loadTodos();
  }, []);

  return {
    todos: todoStore.todos,
    isLoading: todoStore.isLoading,
  };
};
