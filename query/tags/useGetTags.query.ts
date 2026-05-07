import { useQuery } from '@tanstack/react-query';
import { tagsKeys } from '../key/tags';
import tagsService from '@/app/api/tags/client';

const useGetTagsQuery = () => {
  return useQuery({
    queryKey: tagsKeys.base,
    queryFn: () => tagsService.getTags(),
  });
};

export default useGetTagsQuery;
