import { useId} from 'react';
import clsx from 'clsx';
import type { IInputProps } from './types';
import styles from './Input.module.scss';

export function Input({
  label,
  error, 
  id,
  className = '',
  ...props
}: IInputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  
  return (
    <div className={clsx(styles['input-wrapper'], className)}>

      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      
      <input
        id={inputId}
        className={styles.input}
        aria-invalid={Boolean(error)}
        {...props}
      />
      
      {error && <span className={styles['error-message']}>{error}</span>}

    </div>
  );
}
