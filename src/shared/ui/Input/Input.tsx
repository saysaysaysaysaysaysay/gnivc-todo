import { memo, useId} from 'react';
import type { IInputProps } from './types';
import styles from './Input.module.scss';

function InputImpl({
  label,
  error, 
  id,
  className = '',
  ...props
}: IInputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  return (
    <div className={`${styles.inputWrapper} ${className}`}>

      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      
      <input
        id={inputId}
        className={`${styles.input}`}
        aria-invalid={Boolean(error)}
        {...props}
      />
      
      {error && <span className={styles.errorMessage}>{error}</span>}

    </div>
  );
}

export const Input = memo(InputImpl);