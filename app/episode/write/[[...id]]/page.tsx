'use client';

import Header from '@components/title/Header';
import AddImage from '@components/add-eposide/AddImage';
import AddFriends from '@components/add-eposide/AddMates';
import React, { useEffect, useMemo } from 'react';
import AddPlace from '@components/add-eposide/AddPlace';
import AddDates from '@components/add-eposide/AddDates';
import AddTitle from '@components/add-eposide/AddTitle';
import useEpisodeDataStore from '@/stores/episodeDataStore';
import useImageMetaData from '@/stores/imageMetaDataStore';
import { EpisodeImages, OriginalPictureType } from '@/types/episode.types';
import { useRouter } from 'next/navigation';
import Button from '@components/common/buttons/Button';
import AddMemo from '@components/add-eposide/AddMemo';
import AddTag from '@components/add-eposide/AddTag';
import {
  useEpisodeCreateMutation,
  useEpisodeUpdateMutation,
} from '@/query/episodes/useEpisode.mutation';
import DotsLoader from '@components/common/loading/DotsLoader';

export default function AddEpisode({ params }: { params: Promise<{ id?: string[] }> }) {
  const { id } = React.use(params);
  const isEdit = !!id;

  const { date, mates, place, title, pictures, tags, memo, resetEpisodeData } =
    useEpisodeDataStore();
  const { resetMetadata } = useImageMetaData();
  const { push } = useRouter();

  const { mutateAsync: updateEpisode, isPending: isUpdating } = useEpisodeUpdateMutation({
    onSuccess: () => push('/'),
  });

  const { mutateAsync: createEpisode, isPending: isCreating } = useEpisodeCreateMutation({
    onSuccess: () => push('/'),
  });

  const isReadyToAdd = useMemo(() => {
    return !!(date && place && title && pictures);
  }, [date, place, title, pictures]);

  useEffect(() => {
    return () => {
      resetEpisodeData();
      resetMetadata();
    };
  }, []);

  const filteringNewAndOriginals = (images: EpisodeImages[]) => {
    const { newImages, originalImages } = images.reduce<{
      newImages: { file: File; order: number }[];
      originalImages: OriginalPictureType[];
    }>(
      (acc, img) => {
        if (img.file) acc.newImages.push({ file: img.file, order: img.order });
        else acc.originalImages.push({ type: 'exists', id: img.id!, order: img.order });
        return acc;
      },
      { newImages: [], originalImages: [] },
    );

    return { newImages, originalImages };
  };

  const onClickEditEpisode = async () => {
    if (!pictures || !place || !date || !id) return;

    const episodeId = id[0];

    const { newImages, originalImages } = filteringNewAndOriginals(pictures);

    await updateEpisode({
      id: episodeId,
      newImages,
      originalImages,
      body: {
        title,
        date: date.toISOString(),
        matesId: [...mates.keys()],
        place,
        memo,
        tags: tags.map((t) => t.label),
      },
    });
  };

  const onClickAddEpisode = async () => {
    if (!pictures || !place || !date) return;

    const { newImages } = filteringNewAndOriginals(pictures);

    await createEpisode({
      newImages,
      body: {
        title,
        date: date.toISOString(),
        matesId: [...mates.keys()],
        place,
        memo,
        tags: tags.map((t) => t.label),
      },
    });
  };

  const isPending = isEdit ? isUpdating : isCreating;
  const onSubmit = isEdit ? onClickEditEpisode : onClickAddEpisode;
  const label = isEdit ? '수정' : '기록';

  return (
    <div className="h-dvh overflow-hidden flex flex-col">
      <Header title="에피소드 추가하기" />
      <div className="overflow-y-scroll flex-1 pb-20">
        <AddDates />
        <AddPlace />
        <AddTitle />
        <AddMemo />
        <AddTag />
        <AddImage />
        <AddFriends />
      </div>

      <Button
        isBottomBtn
        isDisabled={!isReadyToAdd || isPending}
        onClickFunc={onSubmit}
        isLoading={isPending}
      >
        {isPending ? (
          <div className=" flex justify-center">
            에피소드 {label} 중&nbsp;
            <DotsLoader color="#f9fafb" />
          </div>
        ) : (
          `${label}하기`
        )}
      </Button>
    </div>
  );
}
