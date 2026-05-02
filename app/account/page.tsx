'use client';

import { BadMoodFaceIcon, CupOfTeaIcon } from '@assets/icons';
import List from '@components/common/list';
import DotsLoader from '@components/common/loading/DotsLoader';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import ModalLayer from '@components/common/modal';
import { useState } from 'react';
import AccountDeleteModal from '@components/account/accountDeleteModal';
import useGetProfileQuery from '@/query/user/useGetUserProfile.query';
import { useLogoutMutation } from '@/query/user/useUsers.mutation';

export default function MyAccount() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { data: userProfile } = useGetProfileQuery();
  const { mutateAsync: logoutMutateAsync } = useLogoutMutation();

  const onClickLogout = async () => {
    await logoutMutateAsync(undefined, {
      onSuccess: () => {
        signOut();
      },
    });
  };

  const onClickDeleteAccount = () => {
    setOpenModal(true);
  };

  if (userProfile)
    return (
      <div className="h-[calc(100dvh-109px)] w-full">
        <ModalLayer open={openModal} onClose={() => setOpenModal(false)}>
          <AccountDeleteModal closeModal={() => setOpenModal(false)} />
        </ModalLayer>
        <div className="flex flex-col items-center pt-10 gap-6">
          <div className="relative overflow-hidden h-40 w-40 flex border border-primary rounded-full">
            {userProfile && userProfile.profileImage ? (
              <Image
                fill
                src={userProfile.profileImage}
                alt={`${userProfile.name}의 프로필 이미지`}
                className="absolute object-cover"
                sizes="160px"
              />
            ) : (
              <DotsLoader />
            )}
          </div>

          <div>{userProfile.name}</div>
        </div>

        <div className="absolute bottom-6 px-4 w-full">
          <List label="로그아웃" icon={CupOfTeaIcon} onClickFn={onClickLogout} />
          <List label="계정 삭제하기" icon={BadMoodFaceIcon} onClickFn={onClickDeleteAccount} />
        </div>
      </div>
    );
  else
    return (
      <div className="h-[calc(100dvh-300px)] w-full items-center flex justify-center">
        <DotsLoader />
      </div>
    );
}
