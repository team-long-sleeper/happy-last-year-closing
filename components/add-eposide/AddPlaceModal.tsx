import { ModalDefaultProps } from '@/types/modal.types';
import { Modal } from '@common/modal/template';
import SearchPlace from './SearchPlace';
import { useIsMobile } from '@/hooks/useIsMobile';

export default function AddPlaceModal({ closeModal }: ModalDefaultProps) {
  const isMobile = useIsMobile();
  return (
    <Modal variant={isMobile ? 'fullscreen' : 'modal'}>
      <Modal.Title onClose={closeModal}>에피소드에 장소 추가하기</Modal.Title>
      <Modal.Content>
        <SearchPlace closeModal={closeModal} />
      </Modal.Content>
    </Modal>
  );
}
