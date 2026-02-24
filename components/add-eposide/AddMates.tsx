import Icon from '@components/common/Icon';
import { MateIcon, AddIcon } from '@assets/icons';
import { useState } from 'react';
import AddMatesModal from './AddMatesModal';
import ModalLayer from '@components/common/modal';

export default function AddFriends() {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const onClickAddBtn = () => {
    setOpenModal(true);
  };

  return (
    <>
      <ModalLayer open={openModal} onClose={() => setOpenModal(false)}>
        <AddMatesModal closeModal={() => setOpenModal(false)} />
      </ModalLayer>
      <div className="w-full">
        <span className="text-3xl font-extralight text-primary pl-26 text-right">0</span>
      </div>

      <div className="w-full flex items-start gap-4 pl-25.5">
        <Icon icon={MateIcon} />
        <div
          onClick={onClickAddBtn}
          className="size-17 bg-primary flex justify-center items-center rounded-full cursor-pointer"
        >
          <Icon icon={AddIcon} />
        </div>
      </div>
    </>
  );
}
