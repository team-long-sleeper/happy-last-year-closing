import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { episodesKeys } from '../key/episodes';
import episodeService from '@/app/api/episodes/client';

const useGetEpisodeQuery = () => {
  const { id } = useParams();
  const episodeId = id?.[0];

  return useQuery({
    queryKey: episodesKeys.withId(episodeId!),
    queryFn: () => episodeService.getEpisode(episodeId!),
    enabled: !!episodeId,
  });
};

export default useGetEpisodeQuery;
