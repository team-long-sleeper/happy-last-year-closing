import { ModalDefaultProps } from '@/types/modal.types';
import { Modal } from '@common/modal/template';
import SearchPlace from './SearchPlace';

export default function AddPlaceModal({ closeModal }: ModalDefaultProps) {
  return (
    <Modal>
      <Modal.Title onClose={closeModal}>에피소드에 장소 추가하기</Modal.Title>
      <Modal.Content>
        <SearchPlace closeModal={closeModal} />
      </Modal.Content>
    </Modal>
  );
}
