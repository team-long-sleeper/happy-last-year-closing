'use client';
import Header from '@components/title/Header';
import AddImage from '@components/add-eposide/AddImage';
import AddFriends from '@components/add-eposide/AddMates';
import PrimaryButton from '@components/buttons/PrimaryButton';
import { useState } from 'react';
import AddPlace from '@components/add-eposide/AddPlace';
import AddDates from '@components/add-eposide/AddDates';
import AddTitle from '@components/add-eposide/AddTitle';

export default function AddEpisode() {
  const [isReadyToAdd, setIsReadyToAdd] = useState<boolean>(false);

  return (
    <div className="h-dvh">
      <Header title="에피소드 추가하기" />
      <AddTitle />
      <AddDates />
      <AddPlace />
      <AddImage />
      <AddFriends />
      <PrimaryButton isBottomBtn isDisabled={!isReadyToAdd}>
        추가하기
      </PrimaryButton>
    </div>
  );
}
