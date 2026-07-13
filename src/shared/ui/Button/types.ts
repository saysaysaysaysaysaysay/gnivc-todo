export interface IButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  htmlType?: "submit" | "reset" | "button";
  variant?: "primary" | "default" | "delete";
}
