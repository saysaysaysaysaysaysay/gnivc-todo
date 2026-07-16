export interface IButtonProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  htmlType?: "submit" | "reset" | "button";
  variant?: "primary" | "default" | "delete";
}
