import Icon from '@common/Icon';
import { MateIcon, AddIcon } from '@assets/icons';
import { useEffect, useState } from 'react';
import AddMatesModal from './AddMatesModal';
import ModalLayer from '@common/modal';
import useEpisodeDataStore from '@/stores/add-/episodeDataStore';
import MateProfile from './MateProfile';
import { useIsMobile } from '@/hooks/useIsMobile';
import useGetEpisodeQuery from '@/query/episodes/useGetEpisode.query';

export default function AddFriends() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { mates, setMates } = useEpisodeDataStore();
  const { data: editingEpisode } = useGetEpisodeQuery();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!editingEpisode) return;
    const editingMates = new Map(editingEpisode.mates.map((item) => [item.id, item]));
    setMates(editingMates);
  }, [editingEpisode]);

  const onClickAddBtn = () => {
    setOpenModal(true);
  };

  const onToggleMate = (id: string) => {
    mates.delete(id);
    setMates(mates);
  };

  return (
    <div className="flex items-center gap-2 flex-col w-full pb-12">
      <ModalLayer
        open={openModal}
        onClose={() => setOpenModal(false)}
        variant={isMobile ? 'fullscreen' : 'modal'}
      >
        <AddMatesModal closeModal={() => setOpenModal(false)} />
      </ModalLayer>

      <div className="w-full flex items-start gap-4 pl-16">
        <div className="relative">
          <Icon icon={MateIcon} />
          <span className="absolute right-1/2 translate-x-1/2 top-7.5 text-primary text-right">
            {mates.size}
          </span>
        </div>

        <div className="flex w-full overflow-x-scroll pr-12">
          <div className="flex gap-2">
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
