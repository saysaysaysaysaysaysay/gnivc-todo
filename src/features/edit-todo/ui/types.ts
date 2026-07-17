export interface IEditTodoFormProps {
  todoId: string;
  currentTitle: string;
  onClose?: () => void;
}

export interface IEditTodoFormValues {
  title: string;
}
