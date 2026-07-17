export interface IRenameTodoFormProps {
  todoId: string;
  currentTitle: string;
  onClose?: () => void;
}

export interface IRenameTodoFormValues {
  title: string;
}
