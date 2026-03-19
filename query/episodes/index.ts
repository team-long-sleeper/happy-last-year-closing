import episodeService from '@/app/api/episodes/client';

export const getEpisodeListQueryFn = async () => await episodeService.getEpisodesList();
export const getEpisodeQueryFn = async (id: string) => await episodeService.getEpisode(id);
