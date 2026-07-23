import type { Todo } from "../model/todo.model";

export function getPageData(array: Todo[], page: number, perPage: number) {
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  
  return array.slice(startIndex, endIndex);
}