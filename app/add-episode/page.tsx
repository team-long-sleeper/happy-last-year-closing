'use client';
import Header from '@components/title/Header';
import AddImage from '@components/add-eposide/AddImage';
import AddFriends from '@components/add-eposide/AddMates';
import PrimaryButton from '@components/buttons/PrimaryButton';
import { useEffect, useMemo } from 'react';
import AddPlace from '@components/add-eposide/AddPlace';
import AddDates from '@components/add-eposide/AddDates';
import AddTitle from '@components/add-eposide/AddTitle';
import useEpisodeDataStore from '@/stores/add-/episodeDataStore';
import useImageMetaData from '@/stores/imageMetaDataStore';

export default function AddEpisode() {
  const { date, mates, place, title, resetEpisodeData } = useEpisodeDataStore();
  const { resetMetadata } = useImageMetaData();

  const isReadyToAdd = useMemo(() => {
    return !!(date && mates && place && title);
  }, [date, mates, place, title]);

  useEffect(() => {
    return () => {
      resetEpisodeData();
      resetMetadata();
    };
  }, []);

  return (
    <div className="h-dvh overflow-hidden">
      <Header title="에피소드 추가하기" />
      <div className="overflow-y-scroll pb-52 h-full">
        <AddTitle />
        <AddDates />
        <AddPlace />
        <AddImage />
        <AddFriends />
      </div>

      <PrimaryButton isBottomBtn isDisabled={!isReadyToAdd}>
        추가하기
      </PrimaryButton>
    </div>
  );
}
