import { useId, useRef } from 'react';
import clsx from 'clsx';
import type { IInputProps } from './types';
import styles from './Input.module.scss';
import { Button } from '@/shared/ui';
import { FaX } from 'react-icons/fa6';

export function Input({
  label,
  error,
  id,
  className = '',
  ...props
}: IInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const inputRef = useRef<HTMLInputElement>(null);

  function handleReset() {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    inputRef.current?.focus();
  }

  return (
    <div className={clsx(styles['input-wrapper'], className)}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <div
        className={styles['input-container']}
        aria-invalid={Boolean(error)}
      >
        <input
          id={inputId}
          className={styles.input}
          ref={inputRef}
          {...props}
        />
          <Button
            aria-label="Очистить поле"
            className={styles['input-reset']}
            onClick={handleReset}
          >
            <FaX />
          </Button>
      </div>
      {error && <span className={styles['error-message']}>{error}</span>}
    </div>
  );
}