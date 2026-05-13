import { Modal } from '@common/modal/template';
import ModalButton from '@common/modal/template/ModalButton';
import { useState } from 'react';
import MatesProfileList from './MatesProfileList';
import SearchMates from './SearchMates';
import { Mate } from '@/types/mates.types';
import useEpisodeDataStore from '@/stores/episodeDataStore';
import { ModalDefaultProps } from '@/types/modal.types';
import Button from '@components/common/buttons/Button';

export default function AddMatesModal({ closeModal }: ModalDefaultProps) {
  const { mates, setMates } = useEpisodeDataStore();
  const [selected, setSelected] = useState<Map<string, Mate>>(mates);

  const onClickAddMates = () => {
    setMates(selected);
    closeModal();
  };

  const onToggleMate = (mate: Mate) => {
    // todo  선택 시 제일 오른쪽으로 스크롤 (선택된 친구를 확인할 수 있게)
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
        <div className="px-5 sm:pb-10">
          <div className="flex flex-col gap-6 pb-10">
            <div className="text-primary text-3xl">{selected.size}</div>
            <MatesProfileList mates={selected} onToggleMate={onToggleMate} />
          </div>
          <SearchMates onToggleMate={onToggleMate} selected={selected} />
        </div>
      </Modal.Content>
      <ModalButton>
        <Button onClickFunc={onClickAddMates} isDisabled={selected.size < 1}>
          {selected.size}명 추가하기
        </Button>
      </ModalButton>
    </Modal>
  );
}
