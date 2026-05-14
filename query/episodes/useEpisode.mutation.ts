import episodeService from '@/app/api/episodes/client';
import uploadsService from '@/app/api/uploads/client';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  CreateEpisodeInput,
  CreateEpisodeRes,
  EpisodeUpdateRes,
  PictureCreateReq,
  UpdateEpisodeInput,
} from '@type/episode.types';
import { AxiosError } from 'axios';

export function useEpisodeUpdateMutation(
  options?: Omit<
    UseMutationOptions<EpisodeUpdateRes, AxiosError, UpdateEpisodeInput>,
    'mutationFn'
  >,
) {
  return useMutation<EpisodeUpdateRes, AxiosError, UpdateEpisodeInput>({
    mutationFn: async ({ id, body, newImages, originalImages }) => {
      let uploadedPictures: PictureCreateReq[] = [];

      if (newImages.length > 0) {
        const res = await uploadsService.uploadPictures(newImages);
        if (!res) throw new Error('이미지 업로드에 실패했습니다.');

        uploadedPictures = res.uploads.map((u, i) => ({
          type: 'new',
          key: u.key,
          iv: u.iv,
          order: newImages[i].order,
        }));
      }

      return episodeService.updateEpisode({
        id,
        episodeBody: { ...body, pictures: [...uploadedPictures, ...originalImages] },
      });
    },
    ...options,
  });
}

export function useEpisodeCreateMutation(
  options?: Omit<
    UseMutationOptions<CreateEpisodeRes, AxiosError, CreateEpisodeInput>,
    'mutationFn'
  >,
) {
  return useMutation<CreateEpisodeRes, AxiosError, CreateEpisodeInput>({
    mutationFn: async ({ newImages, body }) => {
      let uploadedPictures: PictureCreateReq[] = [];
      if (newImages.length > 0) {
        const res = await uploadsService.uploadPictures(newImages);
        if (!res) throw new Error('이미지 업로드에 실패했습니다.');

        uploadedPictures = res.uploads.map((u, i) => ({
          type: 'new',
          key: u.key,
          iv: u.iv,
          order: newImages[i].order,
        }));
      }

      return episodeService.createEpisode({ ...body, pictures: uploadedPictures });
    },
    ...options,
  });
}
