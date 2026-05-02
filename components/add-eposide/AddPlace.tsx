import { CloseIcon, PlaceIcon } from '@assets/icons';
import Icon from '@common/Icon';
import ModalLayer from '@common/modal';
import { useEffect, useState } from 'react';
import AddPlaceModal from './AddPlaceModal';
import useGetEpisodeQuery from '@/query/episodes/useGetEpisode.query';
import useEpisodeDataStore from '@/stores/add-/episodeDataStore';

export default function AddPlace() {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { data: editingEpisode } = useGetEpisodeQuery();
  const { place, setPlace } = useEpisodeDataStore();

  useEffect(() => {
    if (!editingEpisode) return;
    console.log(editingEpisode.place, 'editing episode');
    setPlace(editingEpisode.place);
  }, [editingEpisode]);

  const onClickAddBtn = () => {
    setOpenModal(true);
    setPlace(undefined);
  };

  return (
    <div className="flex items-center gap-4 pl-16 pr-5 pb-9">
      <ModalLayer
        open={openModal}
        onClose={() => setOpenModal(false)}
        mobileVariant="fullscreen"
      >
        <AddPlaceModal closeModal={() => setOpenModal(false)} />
      </ModalLayer>
      <Icon icon={PlaceIcon} />
      {place ? (
        <div
          onClick={onClickAddBtn}
          className="hover:[&>span]:text-primary cursor-pointer flex justify-between w-full items-center"
          onMouseEnter={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
        >
          <div className="flex flex-col gap-2  w-full ">
            <span className="text-xl">{place.name}</span>
            <span className="text-sm text-gray-400">{place.address}</span>
          </div>

          <div className="absolute right-10">
            {isHover ? (
              <div className="bg-primary rounded-full size-8 flex justify-center items-center">
                <Icon icon={CloseIcon} iconColor="white" />
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <span onClick={onClickAddBtn} className="text-xl text-primary-sub cursor-pointer">
          에피소드 장소
        </span>
      )}
    </div>
  );
}
