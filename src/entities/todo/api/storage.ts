import type { Todo, IPersistedTodo } from "@/entities/todo";

export const TODO_STORAGE_KEY = "gnivc-todo-items";

function toPersistedTodo(todo: Todo): IPersistedTodo {
  return {
    id: todo.id,
    title: todo.title,
    completed: todo.completed,
    createdAt: todo.createdAt.toISOString(),
  };
}

function fromPersistedTodo(persisted: IPersistedTodo): Todo {
  return {
    id: persisted.id,
    title: persisted.title,
    completed: persisted.completed,
    createdAt: new Date(persisted.createdAt),
  };
}

export async function readTodosFromStorage(): Promise<Todo[]> {
  const raw = window.localStorage.getItem(TODO_STORAGE_KEY);
  if (!raw) {
    return [];
  }
  const parsed = JSON.parse(raw) as IPersistedTodo[];
  return parsed.map(fromPersistedTodo);
}

export async function writeTodosToStorage(todos: Todo[]): Promise<void> {
  const persisted = todos.map(toPersistedTodo);
  window.localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(persisted));
}
