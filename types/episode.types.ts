import z from 'zod';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ImageMetaData {
  date: any;
  gps: {
    lat: any;
    lng: any;
  } | null;
  raw: any;
}

export interface UploadedImage {
  original: File;
  preview: string;
  name: string;
  file: File;
}

export interface CreateEpisodeRes {
  id: string;
}

const PlaceSchema = z.object({
  providerId: z.string(),
  name: z.string(),
  address: z.string(),
  lat: z.number(),
  lng: z.number(),
  url: z.string(),
});

const MateSchema = z.object({
  id: z.string(),
  name: z.string(),
  profileImage: z.string(),
});

export const EpisodeReqSchema = z.object({
  title: z.string().min(1),
  date: z.iso.datetime(),
  matesId: z.array(z.string()).default([]),
  place: PlaceSchema,
  coverIndex: z.number().int().nonnegative(),
  pictureKeys: z.array(z.string().min(1)).min(1).max(50),
});

export const EpisodeResSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  date: z.string().min(1),
  mates: z.array(MateSchema.omit({ profileImage: true })).default([]),
  coverUrl: z.url(),
  place: PlaceSchema,
});

export const EpisodeItemSchema = EpisodeResSchema.extend({
  mates: z.array(MateSchema).default([]),
});

export const EpisodeListResSchema = z.object({
  episodes: z.array(EpisodeResSchema),
});

export const CheckTodayResSchema = z.object({
  hasTodayEpisode: z.boolean(),
});

export type EpisodeReqBody = z.infer<typeof EpisodeReqSchema>;
export type PlaceBody = z.infer<typeof PlaceSchema>;

export type EpisodeResType = z.infer<typeof EpisodeResSchema>;
export type EpisodeListRes = z.infer<typeof EpisodeListResSchema>;
export type EpisodeItemRes = z.infer<typeof EpisodeItemSchema>;

export type CheckTodayRes = z.infer<typeof CheckTodayResSchema>;
