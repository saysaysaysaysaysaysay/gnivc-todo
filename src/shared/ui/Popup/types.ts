export interface PopupProps {
  isOpen: boolean;
  title: string;
  message: React.ReactNode;
  confirmMessage?: React.ReactNode;
  cancelMessage?: React.ReactNode;
  backdropClick?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}
