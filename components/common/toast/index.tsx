'use client';

import { useToasts } from '@/toast';
import Icon from '../Icon';
import { SuceessIcon, WarningIcon } from '@assets/icons';

export default function Toaster() {
  const toasts = useToasts();

  return (
    <div className="fixed z-60" id="toast">
      {toasts.map((t, index) => {
        const offset = toasts.length - 1 - index;
        return (
          <div
            key={t.id}
            style={{
              transform: `translateY(${offset * -8}px) scale(${1 - offset * 0.05})`,
              opacity: 1 - offset * 0.15,
              zIndex: index,
              animation: 'toastIn 0.3s ease-out',
            }}
            className="fixed top-4 left-1/2 -translate-x-1/2
              bg-white  z-50 shadow-sm px-2 py-1 text-sm border border-primary
              transition-all duration-300 whitespace-nowrap flex gap-1 items-center"
          >
            <div>
              {t.type === 'SUCCESS' && <Icon icon={SuceessIcon} iconColor="[#42ac1e]" size="s" />}
              {t.type === 'ERROR' && <Icon icon={WarningIcon} iconColor="#ffc44d" size="s" />}
            </div>
            <div>{t.message}</div>
          </div>
        );
      })}
    </div>
  );
}
