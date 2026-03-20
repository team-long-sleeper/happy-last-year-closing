'use client';

import Header from '@components/title/Header';
import AddImage from '@components/add-eposide/AddImage';
import AddFriends from '@components/add-eposide/AddMates';
import React, { useEffect, useMemo, useState } from 'react';
import AddPlace from '@components/add-eposide/AddPlace';
import AddDates from '@components/add-eposide/AddDates';
import AddTitle from '@components/add-eposide/AddTitle';
import useEpisodeDataStore from '@/stores/add-/episodeDataStore';
import useImageMetaData from '@/stores/imageMetaDataStore';
import { useMutation } from '@tanstack/react-query';
import uploadsService from '../../../api/uploads/client';
import { putUploads } from '@/lib/uploads';
import episodeService from '../../../api/episodes/client';
import {
  EpisodeImages,
  EpisodeReqBody,
  EpisodeReqImageType,
  EpisodeUpdateReqBody,
  UploadedImage,
} from '@/types/episode.types';
import { useRouter } from 'next/navigation';
import Button from '@components/common/buttons/Button';
import AddMemo from '@components/add-eposide/AddMemo';

export default function AddEpisode({ params }: { params: Promise<{ id?: string[] }> }) {
  const { id } = React.use(params);
  const isEdit = !!id;

  const { date, mates, place, title, pictures, memo, deletedPictureId, resetEpisodeData } =
    useEpisodeDataStore();
  const { resetMetadata } = useImageMetaData();
  const [, setLoading] = useState<boolean>(false);
  const { push } = useRouter();

  const presignMutation = useMutation({
    mutationFn: async (mimeTypes: string[]) => {
      return await uploadsService.getPresignedURL({ mimeTypes });
    },
  });

  const episodeCreateMutation = useMutation({
    mutationFn: async (episodeBody: EpisodeReqBody) => {
      return await episodeService.createEpisode(episodeBody);
    },
    onSuccess: (data) => {
      setLoading(false);
      push('/');
    },
  });

  const episodeUpdateMudation = useMutation({
    mutationFn: async ({ id, episodeBody }: { id: string; episodeBody: EpisodeUpdateReqBody }) => {
      return await episodeService.updateEpisode(id, episodeBody);
    },
    onSuccess: (data) => {
      console.log(data);

      setLoading(false);
      push('/');
    },
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

  const uploadeImageFiles = async (images: EpisodeImages[]): Promise<EpisodeReqImageType[]> => {
    const validPictures = images.filter(
      (image): image is UploadedImage => image.file !== undefined,
    );

    const mimeType = validPictures.map((image) => image.file.type);
    const presignResponse = await presignMutation.mutateAsync(mimeType);

    const uploadFileds = validPictures.map((image) => {
      return { file: image.file, order: image.order };
    });
    const imagesResult = await putUploads(presignResponse, uploadFileds);
    return imagesResult;
  };

  const onClickEditEpisode = async () => {
    if (!pictures || !place || !date || !id) return;

    const episodeId = id[0];

    const imageKeys = await uploadeImageFiles(pictures);

    const matesId: string[] = [];
    mates.forEach((_, key) => matesId.push(key));

    const patchBody = {
      title,
      place,
      date: date.toISOString(),
      pictures: imageKeys,
      matesId,
      deletedPictureId,
      memo,
    };

    console.log(patchBody, 'onClickEditEpisode');

    await episodeUpdateMudation.mutateAsync({ id: episodeId, episodeBody: patchBody });
  };

  const onClickAddEpisode = async () => {
    if (!pictures || !place || !date) return;

    setLoading(true);

    const imageKeys = await uploadeImageFiles(pictures);

    const matesId: string[] = [];
    mates.forEach((_, key) => matesId.push(key));

    const requestBody: EpisodeReqBody = {
      title,
      date: date.toISOString(),
      matesId,
      pictures: imageKeys,
      place,
      memo,
    };

    await episodeCreateMutation.mutateAsync(requestBody);
  };

  return (
    <div className="h-dvh overflow-hidden">
      <Header title="에피소드 추가하기" />
      <div className="overflow-y-scroll h-full md:pb-52">
        <AddDates />
        <AddTitle />
        <AddMemo />
        <AddPlace />
        <AddImage />
        <AddFriends />
      </div>

      {isEdit ? (
        <Button isBottomBtn isDisabled={!isReadyToAdd} onClickFunc={onClickEditEpisode}>
          수정하기
        </Button>
      ) : (
        <Button isBottomBtn isDisabled={!isReadyToAdd} onClickFunc={onClickAddEpisode}>
          기록하기
        </Button>
      )}
    </div>
  );
}
