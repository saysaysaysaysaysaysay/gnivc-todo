export interface IInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
  className?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  name?: string;
  id?: string;
  maxLength?: number;
  autoFocus?: boolean;
}
