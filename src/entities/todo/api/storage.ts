import type { Todo } from "@/entities/todo";

export const TODO_STORAGE_KEY = "gnivc-todo-items";

export function readTodosFromStorage(): Todo[] {
  try {
    const raw = localStorage.getItem(TODO_STORAGE_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw) as Todo[];
    return data.map((todo) => ({
      ...todo,
      createdAt:
        typeof todo.createdAt === "string"
          ? new Date(todo.createdAt)
          : todo.createdAt,
    }));
  } catch {
    return [];
  }
}

export function writeTodosToStorage(todos: Todo[]): void {
  const data = todos.map((todo) => ({
    ...todo,
    createdAt:
      typeof todo.createdAt === "string"
        ? todo.createdAt
        : todo.createdAt.toISOString(),
  }));
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(data));
}
