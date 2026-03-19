import { Children, isValidElement } from 'react';
import ModalTitle from './ModalTitle';
import ModalContent from './ModalContent';
import ModalButton from './ModalButton';

export type Variant = 'modal' | 'bottomsheet' | 'fullscreen';

interface ModalTemplateProps {
  children: React.ReactNode;
  variant: Variant;
}
const ModalTitleType = (<ModalTitle />).type;
const ModalContentType = (<ModalContent />).type;
const ModalButtonType = (<ModalButton />).type;

const variantStyles: Record<Variant, string> = {
  modal: 'w-100 max-h-4/5 border-primary border-2 ',
  bottomsheet: 'w-dvw border-t-2 border-primary ',
  fullscreen: 'w-dvw h-dvh border-0 ',
};

export default function ModalTemplate({ children, variant }: ModalTemplateProps) {
  const title = Children.toArray(children).filter(
    (child) => isValidElement(child) && child.type === ModalTitleType,
  );

  const content = Children.toArray(children).filter(
    (child) => isValidElement(child) && child.type === ModalContentType,
  );

  const button = Children.toArray(children).filter(
    (child) => isValidElement(child) && child.type === ModalButtonType,
  );

  const showButton = button.length > 0;
  const isModal = variant === 'modal';

  return (
    <div className={`overflow-hidden flex flex-col`}>
      <div
        className={`flex flex-col gap-10  bg-white ${variantStyles[variant]} ${button ? 'border-b-0' : ''}`}
      >
        <div className="shrink-0">{title}</div>
        <div className="min-h-0 h-full">{content}</div>
        {!isModal && showButton && <div>{button}</div>}
      </div>
      {isModal && showButton && button}
    </div>
  );
}
