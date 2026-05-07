import { createPortal } from 'react-dom';
import { Variant } from './template/ModalTemplate';
import { createContext, useContext, useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';

interface ModalProps {
  open: boolean;
  children: React.ReactNode;
  onClose?: () => void;
  /** 명시 시 모바일/데스크톱 구분 없이 고정. 미지정 시 자동 분기. */
  variant?: Variant;
  /** 자동 분기 시 모바일에서 사용할 variant. 데스크톱은 'modal'로 고정. */
  mobileVariant?: Variant;
}

const overlayStyles: Record<Variant, string> = {
  modal: 'items-center justify-center',
  bottomsheet: 'items-end',
  fullscreen: 'items-stretch',
};

const ModalVariantContext = createContext<Variant | null>(null);

export function useModalVariant() {
  const variant = useContext(ModalVariantContext);
  if (variant === null) {
    throw new Error('useModalVariant must be used within a ModalLayer');
  }
  return variant;
}

export default function ModalLayer({
  open,
  onClose,
  children,
  variant,
  mobileVariant = 'bottomsheet',
}: ModalProps) {
  const isMobile = useIsMobile();
  const resolvedVariant: Variant = variant ?? (isMobile ? mobileVariant : 'modal');

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
    resolvedVariant === 'bottomsheet'
      ? `transition-transform duration-300 ease-in-out ${mounted ? 'translate-y-0' : 'translate-y-full'}`
      : '';

  if (!shouldRender) return null;

  return createPortal(
    <ModalVariantContext.Provider value={resolvedVariant}>
      <div
        className={`fixed h-dvh w-dvw flex z-50 bg-white/70 ${overlayStyles[resolvedVariant]}`}
        onClick={resolvedVariant === 'bottomsheet' && onClose ? onClose : undefined}
      >
        <div className={animationClass} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </ModalVariantContext.Provider>,
    document.getElementById('modal-root')!,
  );
}
