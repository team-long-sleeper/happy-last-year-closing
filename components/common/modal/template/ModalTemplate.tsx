import { Children, isValidElement } from 'react';
import ModalTitle from './ModalTitle';
import ModalContent from './ModalContent';
import ModalButton from './ModalButton';

interface ModalTemplateProps {
  children: React.ReactNode;
}

const ModalTitleType = (<ModalTitle />).type;
const ModalContentType = (<ModalContent />).type;
const ModalButtonType = (<ModalButton />).type;

export default function ModalTemplate({ children }: ModalTemplateProps) {
  const title = Children.toArray(children).filter(
    (child) => isValidElement(child) && child.type === ModalTitleType,
  );

  const content = Children.toArray(children).filter(
    (child) => isValidElement(child) && child.type === ModalContentType,
  );

  const button = Children.toArray(children).filter(
    (child) => isValidElement(child) && child.type === ModalButtonType,
  );

  return (
    <div className="max-h-4/5 overflow-hidden">
      <div
        className={`flex flex-col gap-10  bg-white border-primary border-2 w-100 max-h-4/5 ${button ? 'border-b-0' : ''}`}
      >
        {title}
        {content}
      </div>
      {button}
    </div>
  );
}
