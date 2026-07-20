import { todoStore,  } from '@/entities/todo/model/store';
import styles from './TodoList.module.scss';
import { TodoItem } from '@/features/todo-item';
import {  useEffect } from 'react';
import { observer } from 'mobx-react';
import { Spinner }  from '@/shared/ui/Spinner';


export const TodoList = observer(function TodoList() {
  useEffect(() => {
   todoStore.loadTodos()
  }, [])

  const { todos, isLoading } = todoStore;

   if (isLoading) {
    return (
      <div className={styles['todo-list__loading']}>
        <Spinner />
      </div>
    );
  }

  if (todos.length === 0) {
    return <p className={styles['todo-list__empty']}>Пока нет задач</p>;
  }

  return (
    <ul className={styles['todo-list']}>
      {todos.map((todo) => (
        <li key={todo.id} className={styles['todo-list__item']}>
          <TodoItem
            todo={todo}
          />
        </li>
      ))}
    </ul>
  );
})
