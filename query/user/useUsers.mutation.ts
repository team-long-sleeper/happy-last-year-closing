import userService from '@/app/api/user/client';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useDeleteAccountMutation(
  options?: Omit<UseMutationOptions<void, AxiosError>, 'mutationFn'>,
) {
  return useMutation<void, AxiosError>({
    mutationFn: () => userService.deleteAccount(),
    ...options,
  });
}

export function useLogoutMutation(
  options?: Omit<UseMutationOptions<void, AxiosError>, 'mutationFn'>,
) {
  return useMutation<void, AxiosError>({
    mutationFn: () => userService.postLogout(),
    ...options,
  });
}
