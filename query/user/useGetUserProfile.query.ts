import userService from '@/app/api/user/client';
import { useQuery } from '@tanstack/react-query';
import { UserDataResponse } from '@type/user.types';
import { profileKeys, UserProfileKeyType } from '../key/user';

const useGetProfileQuery = () => {
  return useQuery<UserDataResponse, Error, UserDataResponse, UserProfileKeyType>({
    queryKey: profileKeys.base,
    queryFn: () => userService.getProfile(),
  });
};

export default useGetProfileQuery;
