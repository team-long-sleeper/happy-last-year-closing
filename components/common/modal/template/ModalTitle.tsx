import { CloseIcon } from '@assets/icons';
import Icon from '@common/Icon';

interface ModalTitleProps {
  children?: React.ReactNode;
  onClose?: () => void;
}

export default function ModalTitle({ children, onClose }: ModalTitleProps) {
  return (
    <div className="flex justify-between px-5 pt-5">
      <div className="text-primary">{children}</div>
      <Icon icon={CloseIcon} onClickFunc={onClose} />
    </div>
  );
}
