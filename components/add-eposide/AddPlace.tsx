import { CloseIcon, PlaceIcon } from '@assets/icons';
import Icon from '@components/common/Icon';
import ModalLayer from '@components/common/modal';
import { useState } from 'react';
import AddPlaceModal from './AddPlaceModal';
import useEpisodeDataStore from '@/stores/add-/episodeDataStore';

export default function AddPlace() {
  const [isHover, setIsHover] = useState<boolean>(false);
  const { place, setPlace } = useEpisodeDataStore();
  // todo 반복되는거 훅으로 뺄까?
  const [openModal, setOpenModal] = useState<boolean>(false);

  const onClickAddBtn = () => {
    setOpenModal(true);
    if (place) setPlace(undefined);
  };

  return (
    <div className="flex items-center gap-4 pl-25.5 pr-5 pb-12 ">
      <ModalLayer open={openModal} onClose={() => setOpenModal(false)}>
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
            <span className="text-2xl">{place.place_name}</span>
            <span className="text-sm text-gray-400">{place.address_name}</span>
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
        <span onClick={onClickAddBtn} className="text-2xl text-primary-sub cursor-pointer">
          에피소드 장소
        </span>
      )}
    </div>
  );
}
