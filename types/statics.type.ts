import z from 'zod';

export interface GetStaticsParam {
  startDate?: string;
  endDate?: string;
  contactIds?: string[];
  placeIds?: string;
  tagIds?: number[];
}

const ContactType = z.object({
  id: z.string(),
  name: z.string(),
  profileImage: z.httpUrl(),
});

const StaticsTopContact = z.object({
  contact: ContactType,
  episodeCount: z.number(),
});

const PlaceType = z.object({
  id: z.number(),
  name: z.string(),
  address: z.string(),
  thumbnailUrl: z.httpUrl(),
});

const StaticsTopPlaces = z.object({
  place: PlaceType,
  episodeCount: z.number(),
});

const TagType = z.object({
  id: z.number(),
  label: z.string(),
});

const StaticsTopTags = z.object({
  tag: TagType,
  episodeCount: z.number(),
  thumbnailUrl: z.httpUrl(),
});

const StaticSummary = z.object({
  totalEpisodes: z.number(),
  uniquePlaces: z.number(),
  uniqueContacts: z.number(),
  monthlyAverage: z.number(),
});

export const GetStaticsRes = z.object({
  summary: StaticSummary,
  topContacts: z.array(StaticsTopContact),
  topPlaces: z.array(StaticsTopPlaces),
  topTags: z.array(StaticsTopTags),
});

export type GetStaticsResData = z.infer<typeof GetStaticsRes>;
