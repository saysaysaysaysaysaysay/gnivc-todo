import { makeAutoObservable, runInAction } from "mobx";
import type { Todo } from "@/entities/todo";
import { todoApi } from "@/entities/todo/api";

export class TodoStore {
  todos: Todo[] = [];
  isLoading = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.loadTodos();
  }

  async loadTodos(): Promise<void> {
    this.isLoading = true;
    try {
      const todos = await todoApi.getAll();
      runInAction(() => {
        this.todos = todos;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async addTodo(title: string): Promise<void> {
    const createdTodo = await todoApi.create({ title });

    runInAction(() => {
      this.todos = [createdTodo, ...this.todos];
    });
  }

  async toggleTodo(id: string): Promise<void> {
    const target = this.todos.find((todo) => todo.id === id);

    if (!target) {
      return;
    }

    const updatedTodo = await todoApi.update(id, {
      completed: !target.completed,
    });

    runInAction(() => {
      this.todos = this.todos.map((todo) =>
        todo.id === id ? updatedTodo : todo,
      );
    });
  }

  async deleteTodo(id: string): Promise<void> {
    await todoApi.delete(id);

    runInAction(() => {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    });
  }
}

export const todoStore = new TodoStore();
