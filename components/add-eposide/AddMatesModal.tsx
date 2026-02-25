import { SearchIcon } from '@assets/icons';
import PrimaryButton from '@components/buttons/PrimaryButton';
import Icon from '@components/common/Icon';
import { Modal } from '@components/common/modal/template';
import ModalButton from '@components/common/modal/template/ModalButton';
import { useEffect, useState } from 'react';
import MatesProfileList from './MatesProfileList';
import SearchMates from './SearchMates';
import { Mate } from '@/types/mates.types';

// todo 공통 타입으로 빼야할 것 같음
interface AddMatesModalProps {
  closeModal: () => void;
}

export default function AddMatesModal({ closeModal }: AddMatesModalProps) {
  const [selected, setSelected] = useState<Map<string, Mate>>(new Map());

  const onToggleMate = (mate: Mate) => {
    setSelected((prev) => {
      const next = new Map(prev);
      if (next.has(mate.id)) {
        next.delete(mate.id);
      } else {
        next.set(mate.id, mate);
      }
      return next;
    });
  };

  return (
    <Modal>
      <Modal.Title onClose={closeModal}>에피소드에 친구 추가하기</Modal.Title>
      <Modal.Content>
        <div className="px-5 pb-10">
          <div className="flex flex-col gap-6 pb-10">
            <div className="text-primary text-3xl">{selected.size}</div>
            <MatesProfileList mates={selected} onToggleMate={onToggleMate} />
          </div>
          <SearchMates onToggleMate={onToggleMate} selected={selected} />
        </div>
      </Modal.Content>
      <ModalButton>
        <PrimaryButton isDisabled={selected.size < 1}>{selected.size}명 추가하기</PrimaryButton>
      </ModalButton>
    </Modal>
  );
}
