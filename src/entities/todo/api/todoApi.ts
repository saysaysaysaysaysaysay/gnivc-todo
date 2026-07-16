import type { Todo } from "../model/types";
import { readTodosFromStorage, writeTodosToStorage } from "./storage";
import type { ITodoApi } from "./types";

function createTodoId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
}
function createUTCDate(): Date {
  return new Date(new Date().toISOString());
}

export const todoApi: ITodoApi = {
  async getAll(): Promise<Todo[]> {
    return readTodosFromStorage();
  },

  async create(data: Pick<Todo, "title">): Promise<Todo> {
    const todo: Todo = {
      id: createTodoId(),
      title: data.title.trim(),
      completed: false,
      createdAt: createUTCDate(),
    };

    const todos = await readTodosFromStorage();
    await writeTodosToStorage([todo, ...todos]);

    return todo;
  },

  async update(
    id: string,
    data: Partial<Pick<Todo, "title" | "completed">>,
  ): Promise<Todo> {
    const todos = await readTodosFromStorage();
    const target = todos.find((todo) => todo.id === id);
    if (!target) {
      throw new Error("Todo не найден");
    }

    const updatedTodo: Todo = {
      ...target,
      ...data,
    };

    await writeTodosToStorage(
      todos.map((todo) => (todo.id === id ? updatedTodo : todo)),
    );

    return updatedTodo;
  },

  async delete(id: string): Promise<void> {
    const todos = await readTodosFromStorage();
    await writeTodosToStorage(todos.filter((todo) => todo.id !== id));
  },
};

