import { FilterParams } from '@type/filter.types';

export const episodesKeys = {
  base: [{ scope: 'episodes' }] as const,
  withId: (episode_id: string) => [episodesKeys.base[0].scope, episode_id] as const,
  withFilter: (params: FilterParams) => [episodesKeys.base[0].scope, params] as const,
};

export type EpisodeWithIdKeyType = ReturnType<typeof episodesKeys.withId>;
