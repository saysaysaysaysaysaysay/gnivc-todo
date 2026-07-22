import { Button } from '@/shared/ui';
import styles from './Popup.module.scss';
import type { PopupProps } from './types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';


export function Popup({
  isOpen,
  title,
  message,
  onCancel,
  onConfirm,
  cancelMessage = "Отменить",
  confirmMessage = "Подтвердить",
  backdropClick = true,
}: PopupProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = () => {
     if (backdropClick) { 
      onCancel();
     }
  }

  return createPortal(
    <div className={styles.overlay} role='presentation' onClick={handleOverlayClick}>
      <div
        className={styles.dialog}
        role='dialog'
        aria-modal='true'
        aria-labelledby='confirmation-popup-title'
        onClick={(event) => event.stopPropagation()}
      >
        <h3 id='confirmation-popup-title' className={styles.title}>
          {title}
        </h3>
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          <Button variant='default' className={styles.cancelButton} onClick={onCancel}>
            {cancelMessage}
          </Button>
          <Button variant='delete' className={styles.confirmButton} onClick={onConfirm}>
            {confirmMessage}
          </Button>
        </div>
      </div>
    </div>,
    document.body 
  );
}