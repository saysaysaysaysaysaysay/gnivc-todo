import { makeAutoObservable, runInAction } from "mobx"
import { todoService } from "../api/todo.api"
import { getPageData } from "../lib/todo.lib"
import type { Todo } from "../model/todo.model"

class TodoStore {
  todos: Todo[] = []
  isLoading = false
  error: string | null = null
  page: number = 1
  perPage: number = 10
  pages: number = 0
  idEditTodo: string = ""
  allCountTodo: number = 0

  constructor() {
    makeAutoObservable(this)
  }

  getAllTodo = async (page?: number, perPage?: number) => {
    this.isLoading = true
    this.error = null
    try {
      const response = await todoService.getAll<Todo>()
      if (response) {
        const pages = perPage
          ? Math.ceil(response.length / perPage)
          : Math.ceil(response.length / this.perPage)

        runInAction(() => {
          if (page) this.page = page
          if (perPage) this.perPage = perPage
          this.pages = pages
          if (page && perPage) this.todos = getPageData(response, page, perPage)
          else this.todos = getPageData(response, this.page, this.perPage)
          this.allCountTodo = response.length
          this.isLoading = false
        })
      }
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : "Unknown error"
        this.isLoading = false
      })
      console.log(error)
    }
  }

  addTodo = async (title: string) => {
    this.isLoading = true
    this.error = ""
    try {
      const response = await todoService.getAll<Todo>()

      if (response && response.find((item) => item.title === title)) {
        return runInAction(() => {
          this.isLoading = false
          this.error = "Такая задача уже существует"
        })
      }

      const data: Todo = {
        id: title,
        title: title,
        completed: false,
        createdAt: new Date(),
      }
      await todoService.create(data)
      runInAction(() => {
        this.isLoading = false
        this.allCountTodo++
        this.todos.push(data)
        if (this.todos.length + 1 > this.perPage) this.getAllTodo()
      })
    } catch (error) {
      runInAction(() => {
        this.isLoading = false
      })
      console.log(error)
    }
  }

  updateTodo = async (id: string, data: Todo) => {
    this.isLoading = true
    this.error = ""

    try {
      const response = await todoService.getAll<Todo>()

      if (response && response.find((item) => item.title === data.title)) {
        return runInAction(() => {
          this.isLoading = true
          this.error = "Такая задача уже существует"
        })
      }

      const updated = await todoService.update(id, data)
      runInAction(() => {
        const index = this.todos.findIndex((item) => item.id === id)
        if (index != -1) this.todos[index] = updated
        this.isLoading = false
      })
    } catch (error) {
      runInAction(() => {
        this.isLoading = false
      })
      console.error(error)
    }
  }

  toggleCompleteTodo = async (data: Todo) => {
    try {
      const updated = await todoService.update(data.id, {
        ...data,
        completed: !data.completed,
      })
      runInAction(() => {
        const index = this.todos.findIndex((item) => item.id === data.id)
        if (index != -1) this.todos[index] = updated
      })
    } catch {
      console.log("Error in toggle")
    }
  }

  removeTodo = async (id: string) => {
    this.isLoading = true
    try {
      await todoService.remove(id)
      runInAction(() => {
        this.todos = this.todos.filter((item) => item.id !== id)
        this.allCountTodo--
        this.isLoading = false
        this.getAllTodo()
      })
    } catch (error) {
      runInAction(() => {
        this.isLoading = false
      })
      console.log(error)
    }
  }

  sortTodo = (isSorted: boolean) => {
    runInAction(() => {
      this.todos.sort((a, b) => {
        const newA = new Date(a.createdAt)
        const newB = new Date(b.createdAt)

        return isSorted
          ? newB.getTime() - newA.getTime()
          : newA.getTime() - newB.getTime()
      })
    })
  }

  setIdEditTodo = (title: string) => {
    if (this.idEditTodo.length > 0)
      runInAction(() => {
        this.idEditTodo = ""
      })
    else
      runInAction(() => {
        this.idEditTodo = title
      })
  }
}

export const todoStore = new TodoStore()
