import clsx from 'clsx';
import styles from './Button.module.scss';
import type { IButtonProps } from './types';

export function Button({
  children,
  icon,
  onClick,
  disabled = false,
  className = '',
  variant = 'default',
  htmlType = 'button'
}: IButtonProps) {
  
  return (
    <button
      className={clsx(
        styles.button,
        styles[variant],
        className
      )}
      onClick={onClick}
      type={htmlType}
      disabled={disabled}
    >
      {icon ? <span className={styles.icon}>{icon}</span> : null}
      {children ? <span className={styles.content}>{children}</span> : null}
    </button>
  );
}
