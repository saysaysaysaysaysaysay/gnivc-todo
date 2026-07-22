import { makeAutoObservable, runInAction } from "mobx";
import type { Todo } from "@/entities/todo";
import { todoApi } from "@/entities/todo/api";

export class TodoStore {
  todos: Todo[] = [];
  isLoading = false;
  editingTodoId: string | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async loadTodos(): Promise<void> {
    if (this.isLoading || this.todos.length > 0) return;

    runInAction(() => {
      this.isLoading = true;
    });

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

  async renameTodo(id: string, title: string): Promise<void> {
    const currentTodo = this.todos.find((todo) => todo.id === id);

    if (!currentTodo || currentTodo.title === title) {
      return;
    }

    const updatedTodo = await todoApi.update(id, { title });

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

  setEditingTodo(id: string | null): void {
    runInAction(() => {
      this.editingTodoId = id;
    });
  }
}

const createStore = () => new TodoStore();

let todoStore =
  (import.meta.hot?.data?.todoStore as TodoStore | undefined) ?? createStore();

if (import.meta.hot) {
  import.meta.hot.accept();
  import.meta.hot.dispose((data) => {
    data.todoStore = todoStore;
  });

  import.meta.hot.accept((newModule) => {
    const nextStore = newModule?.todoStore ?? createStore();

    if (nextStore && nextStore !== todoStore) {
      runInAction(() => {
        nextStore.todos = todoStore.todos;
        nextStore.isLoading = todoStore.isLoading;
      });

      todoStore = nextStore;
    }
  });
}

export { todoStore };
