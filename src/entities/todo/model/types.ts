export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}
export type IPersistedTodo = Pick<Todo, "id" | "title" | "completed"> & {
  createdAt: string;
};
