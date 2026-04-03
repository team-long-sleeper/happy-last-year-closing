import tagsService from '@/app/api/tags/client';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { PostTagBody, PostTagResponse } from '@type/tag.type';
import { AxiosError } from 'axios';

export function useTagCreateMutation(
  options?: Omit<UseMutationOptions<PostTagResponse, AxiosError, PostTagBody>, 'mutationFn'>,
) {
  return useMutation<PostTagResponse, AxiosError, PostTagBody>({
    mutationFn: (data) => tagsService.postTag(data),
    ...options,
  });
}
