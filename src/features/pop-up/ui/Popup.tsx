import { Button } from '@/shared/ui';
import styles from './Popup.module.scss';
import type { ConfirmationPopupProps } from './types';

export function ConfirmationPopup({
  isOpen,
  title,
  message,
  onCancel,
  onConfirm,
}: ConfirmationPopupProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay} role='presentation' onClick={onCancel}>
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
            Отмена
          </Button>
          <Button variant='delete' className={styles.confirmButton} onClick={onConfirm}>
            Подтвердить
          </Button>
        </div>
      </div>
    </div>
  );
}
