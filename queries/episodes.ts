import episodeService from '@/app/api/episodes/client';

export const episodeListQueryKey = ['episodes'];
export const episodeListQueryFn = async () => await episodeService.getEpisodesList();
