import type { Todo } from "../model/types";

export interface ITodoApi {
  getAll(): Promise<Todo[]>;
  create(data: Pick<Todo, "title">): Promise<Todo>;
  update(
    id: string,
    data: Partial<Pick<Todo, "title" | "completed">>,
  ): Promise<Todo>;
  delete(id: string): Promise<void>;
}
