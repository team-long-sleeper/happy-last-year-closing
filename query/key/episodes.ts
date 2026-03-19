export const episodesKeys = {
  base: [{ scope: 'episodes' }] as const,
  withId: (episode_id: string) => [episodesKeys.base[0].scope, episode_id] as const,
};

export type EpisodeWithIdKeyType = ReturnType<typeof episodesKeys.withId>;
