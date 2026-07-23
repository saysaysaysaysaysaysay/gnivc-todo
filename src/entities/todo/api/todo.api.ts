import { ENDPOINT } from "../config/todo.config"
import type { Todo } from "../model/todo.model"

const getTodos = <T>(): T[] => {
  const data = localStorage.getItem(ENDPOINT)
  if (!data) return []
  try {
    return JSON.parse(data)
  } catch {
    return []
  }
}

const saveTodos = <T>(todos: T[]): void => {
  localStorage.setItem(ENDPOINT, JSON.stringify(todos))
}

export const todoService = {
  async getAll<Todo>(): Promise<Todo[] | undefined> {
    try {
      return getTodos<Todo>()
    } catch (e) {
      throw new Error("GetAll error: ", { cause: e })
    }
  },

  async create(data: Todo): Promise<void> {
    try {
      const currTodos = getTodos<Todo>()
      currTodos.push(data)
      saveTodos<Todo>(currTodos)
    } catch (e) {
      throw new Error("Create error: ", { cause: e })
    }
  },

  async update(id: string, data: Todo): Promise<Todo> {
    try {
      const currTodos = getTodos<Todo>()
      const needIndex = currTodos.findIndex((item) => item.id === id)
      currTodos[needIndex] = data
      saveTodos(currTodos)
      return data
    } catch (e) {
      throw new Error("Update error: ", { cause: e })
    }
  },

  async remove(id: string): Promise<void> {
    try {
      const currTodos = getTodos<Todo>()
      const removedItem = currTodos.filter((item) => item.id !== id)
      saveTodos(removedItem)
    } catch (e) {
      throw new Error("Remove error: ", { cause: e })
    }
  },
}
