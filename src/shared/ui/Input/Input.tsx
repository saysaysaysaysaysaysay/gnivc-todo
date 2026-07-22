
import { useId, useRef, forwardRef, type Ref} from 'react';
import clsx from 'clsx';
import type { IInputProps } from './types';
import styles from './Input.module.scss';
import { Button } from '@/shared/ui';
import { FaX } from 'react-icons/fa6';

function assignRef<T>(ref: Ref<T>, value: T) {
  if (typeof ref === 'function') {
    ref(value)
  } else if (ref) {
    ref.current = value;
  }
}

export const Input = forwardRef<HTMLInputElement, IInputProps>( function Input({
  label,
  error, 
  id,
  className = '',
  onClear,
  ...props
}, externalRef) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const inputRef = useRef<HTMLInputElement>(null);

  function handleClear() {
    onClear();
    inputRef.current?.focus();
  }
  
  return (
    <div className={clsx(styles['input-wrapper'], className)}>

      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles['input-container']}
        aria-invalid={Boolean(error)}>
      <input
        id={inputId}
        className={styles.input}
        aria-invalid={Boolean(error)}
        ref = {(el) => {
          inputRef.current = el;
          assignRef(externalRef, el)
        } }
        
        {...props}
      />
      <Button className={styles['input-reset']} onClick={handleClear}><FaX/></Button>
      </div>
      {error && <span className={styles['error-message']}>{error}</span>}

    </div>
  );
})
