import { createPortal } from 'react-dom';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function ModalLayer({ open, onClose, children }: ModalProps) {
  if (!open) return null;

  return createPortal(
    <div className="fixed h-dvh w-dvw flex justify-center items-center" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>,
    document.getElementById('modal-root')!,
  );
}
