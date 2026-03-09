'use client';
import Header from '@components/title/Header';
import AddImage from '@components/add-eposide/AddImage';
import AddFriends from '@components/add-eposide/AddMates';
import PrimaryButton from '@components/buttons/PrimaryButton';
import { useEffect, useMemo, useState } from 'react';
import AddPlace from '@components/add-eposide/AddPlace';
import AddDates from '@components/add-eposide/AddDates';
import AddTitle from '@components/add-eposide/AddTitle';
import useEpisodeDataStore from '@/stores/add-/episodeDataStore';
import useImageMetaData from '@/stores/imageMetaDataStore';
import { useMutation } from '@tanstack/react-query';
import uploadsService from '../api/uploads/client';
import { putUploads } from '@/lib/uploads';
import episodeService from '../api/episodes/client';
import { CreateEpisodeReq, PlaceBody } from '@/types/episode.types';
import { useRouter } from 'next/navigation';

export default function AddEpisode() {
  const { date, mates, place, title, pictures, resetEpisodeData } = useEpisodeDataStore();
  const { resetMetadata } = useImageMetaData();
  const [, setLoading] = useState<boolean>(false);
  const { push } = useRouter();

  const presignMutation = useMutation({
    mutationFn: async (mimeTypes: string[]) => {
      return await uploadsService.getPresignedURL({ mimeTypes });
    },
  });

  const episodeMutation = useMutation({
    mutationFn: async (episodeBody: CreateEpisodeReq) => {
      return await episodeService.createEpisode(episodeBody);
    },
    onSuccess: (data) => {
      if (!data) return;

      setLoading(false);
      push('/');
    },
  });

  const isReadyToAdd = useMemo(() => {
    return !!(date && mates && place && title);
  }, [date, mates, place, title]);

  useEffect(() => {
    return () => {
      resetEpisodeData();
      resetMetadata();
    };
  }, []);

  const onClickAddEpisode = async () => {
    if (!pictures || !place || !date) return;

    setLoading(true);

    const mimeType = pictures.map((image) => image.file.type);

    const presignResponse = await presignMutation.mutateAsync(mimeType);

    const uploadFileds = pictures.map((image) => image.file);

    const keys = await putUploads(presignResponse, uploadFileds);

    const matesId: string[] = [];
    mates.forEach((_, key) => matesId.push(key));

    const placeBody: PlaceBody = {
      address: place.address_name,
      name: place.place_name,
      lat: Number(place.y),
      lng: Number(place.x),
      providerId: 'KAKAO',
      url: place.place_url,
    };

    const requestBody: CreateEpisodeReq = {
      title,
      date: date.toISOString(),
      coverIndex: 0,
      matesId,
      pictureKeys: keys,
      place: placeBody,
    };

    await episodeMutation.mutateAsync(requestBody);
  };

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

      <PrimaryButton isBottomBtn isDisabled={!isReadyToAdd} onClickFunc={onClickAddEpisode}>
        추가하기
      </PrimaryButton>
    </div>
  );
}
