import Button from '@components/common/buttons/Button';
import { Modal } from '@components/common/modal/template';
import { ModalDefaultProps } from '@type/modal.types';

interface ExpungeModalProps {
  onClickDelete: () => void;
}

export default function ExpungeModal({
  closeModal,
  onClickDelete,
}: ModalDefaultProps & ExpungeModalProps) {
  return (
    <Modal>
      <Modal.Title onClose={closeModal}>내 데이터 삭제하기</Modal.Title>
      <Modal.Content>
        <div className="px-5">작성하신 에피소드, 친구 목록, 에피소드 사진들이 지금 삭제됩니다.</div>
      </Modal.Content>
      <Modal.Button twStyle="flex">
        <Button buttonType="TETIARY" onClickFunc={closeModal}>
          취소
        </Button>
        <Button onClickFunc={onClickDelete}>삭제</Button>
      </Modal.Button>
    </Modal>
  );
}
