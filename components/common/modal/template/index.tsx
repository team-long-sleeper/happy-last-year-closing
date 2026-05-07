import ModalButton from './ModalButton';
import ModalContent from './ModalContent';
import ModalTemplate from './ModalTemplate';
import ModalTitle from './ModalTitle';

export const Modal = Object.assign(ModalTemplate, {
  Title: ModalTitle,
  Content: ModalContent,
  Button: ModalButton,
});
