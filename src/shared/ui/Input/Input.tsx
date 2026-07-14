import { memo, type ChangeEvent, useCallback } from 'react';
import type { IInputProps } from './types';
import styles from './Input.module.scss';

function InputImpl({
  value,
  onChange,
  onBlur,
  placeholder,
  label,
  error,
  required = false,
  className = '',
  type = 'text',
  name,
  id,
  maxLength,
  autoFocus = false,
}: IInputProps) {
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  }, [onChange]);

  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onBlur?.(e.target.value);
  }, [onBlur]);

  return (
    <div className={`${styles.inputWrapper} ${className}`}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        autoFocus={autoFocus}
        className={`${styles.input} ${error ? styles.error : ''}`}
      />
      
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}

export const Input = memo(InputImpl);