import { createPortal } from 'react-dom';
import { Variant } from './template/ModalTemplate';
import { useEffect, useState } from 'react';

interface ModalProps {
  open: boolean;
  children: React.ReactNode;
  onClose?: () => void;
  variant?: Variant;
}

const overlayStyles: Record<Variant, string> = {
  modal: 'items-center justify-center',
  bottomsheet: 'items-end',
  fullscreen: 'items-stretch',
};

export default function ModalLayer({ open, onClose, children, variant = 'modal' }: ModalProps) {
  const [visible, setVisible] = useState(open);
  const [mounted, setMounted] = useState(open);

  if (open && !visible) setVisible(true);

  useEffect(() => {
    if (!open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMounted(false);
      const timer = setTimeout(() => setVisible(false), 400);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // visible effect는 열릴 때만
  useEffect(() => {
    if (visible && open) {
      const frame = requestAnimationFrame(() => setMounted(true));
      return () => cancelAnimationFrame(frame);
    }
  }, [visible, open]);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const shouldRender = open || visible;

  const animationClass =
    variant === 'bottomsheet'
      ? `transition-transform duration-300 ease-in-out ${mounted ? 'translate-y-0' : 'translate-y-full'}`
      : '';

  if (!shouldRender) return null;

  return createPortal(
    <div
      className={`fixed h-dvh w-dvw flex z-50 bg-white/70 ${overlayStyles[variant]}`}
      onClick={variant === 'bottomsheet' && onClose ? onClose : undefined}
    >
      <div className={animationClass} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')!,
  );
}
