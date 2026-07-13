import { type FC, memo } from "react";
import styles from './Button.module.scss';
import type { IButtonProps } from "./types";

const ButtonImpl: FC<IButtonProps> = ({
  children,
  onClick,
  className = "",
  variant = "default",
  htmlType = "button"
}) => {
  return (
    <button
      className={`
        ${styles.button} 
        ${styles[variant]} 
        ${className}
      `}
      onClick={onClick}
      type={htmlType}
    >
      {children}
    </button>
  );
};

export const Button = memo(ButtonImpl);