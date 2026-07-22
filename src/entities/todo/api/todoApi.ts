import type { Todo } from "../model/types";
import { readTodosFromStorage, writeTodosToStorage } from "./storage";
import type { ITodoApi } from "./types";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

function createTodoId(): string {
  return uuidv4();
}
function createUTCDate(): Date {
  return dayjs().utc().toDate();
}

export const todoApi: ITodoApi = {
  async getAll(): Promise<Todo[]> {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return readTodosFromStorage();
  },

  async create(data: Pick<Todo, "title">): Promise<Todo> {
    const todo: Todo = {
      id: createTodoId(),
      title: data.title.trim(),
      completed: false,
      createdAt: createUTCDate(),
    };

    const todos = readTodosFromStorage();
    writeTodosToStorage([todo, ...todos]);

    return todo;
  },

  async update(
    id: string,
    data: Partial<Pick<Todo, "title" | "completed">>,
  ): Promise<Todo> {
    const todos = readTodosFromStorage();
    const target = todos.find((todo) => todo.id === id);
    if (!target) {
      throw new Error("Todo не найден");
    }

    const updatedTodo: Todo = {
      ...target,
      ...data,
    };

    writeTodosToStorage(
      todos.map((todo) => (todo.id === id ? updatedTodo : todo)),
    );

    return updatedTodo;
  },

  async delete(id: string): Promise<void> {
    const todos = readTodosFromStorage();
    writeTodosToStorage(todos.filter((todo) => todo.id !== id));
  },
};
