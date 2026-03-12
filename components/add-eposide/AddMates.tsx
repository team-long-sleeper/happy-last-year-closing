import Icon from '@common/Icon';
import { MateIcon, AddIcon } from '@assets/icons';
import { useState } from 'react';
import AddMatesModal from './AddMatesModal';
import ModalLayer from '@common/modal';
import useEpisodeDataStore from '@/stores/add-/episodeDataStore';
import MateProfile from './MateProfile';

export default function AddFriends() {
  const { mates, setMates } = useEpisodeDataStore();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const onClickAddBtn = () => {
    setOpenModal(true);
  };

  const onToggleMate = (id: string) => {
    mates.delete(id);
    setMates(mates);
  };

  return (
    <div className="flex items-center gap-2 flex-col w-full">
      <ModalLayer open={openModal} onClose={() => setOpenModal(false)}>
        <AddMatesModal closeModal={() => setOpenModal(false)} />
      </ModalLayer>
      <div className="w-full">
        <span className="text-3xl font-extralight text-primary pl-26 text-right">{mates.size}</span>
      </div>

      <div className="w-full flex items-start gap-4 pl-25.5">
        <Icon icon={MateIcon} />
        <div className="flex w-[calc(100dvw-180px)]">
          <div className="flex gap-2 overflow-x-scroll w-full">
            {mates ? (
              <>
                {Array.from(mates.values()).map((mate) => (
                  <div className="relative" key={mate.name}>
                    <MateProfile mate={mate} onToggleMate={() => onToggleMate(mate.id)} />
                  </div>
                ))}
              </>
            ) : null}
            <div>
              <div
                onClick={onClickAddBtn}
                className="relative size-17! bg-primary flex justify-center items-center rounded-full cursor-pointer"
              >
                <Icon icon={AddIcon} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
