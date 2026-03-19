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
  src: string;
  name: string;
  file: File;
  order: number;
}

export interface EpisodeImages {
  id?: number;
  order: number;
  src: string;
  name?: string;
  file?: File;
}

export const EpisodePictureSchema = z.object({
  id: z.number(),
  order: z.number(),
  url: z.string(),
});

export interface CreateEpisodeRes {
  id: string;
}

const PlaceSchema = z.object({
  providerId: z.string(),
  name: z.string(),
  address: z.string(),
  /** 경도, 카카오맵에서는 y값 */
  lat: z.number(),
  /** 위도, 카카오맵에서는 x값 */
  lng: z.number(),
  url: z.string(),
});

const MateSchema = z.object({
  id: z.string(),
  name: z.string(),
  profileImage: z.string(),
});

export const PicturesReqSchema = z.object({
  key: z.string(),
  order: z.number(),
});

export const EpisodeCreateReqSchema = z.object({
  title: z.string().min(1),
  date: z.iso.datetime(),
  matesId: z.array(z.string()).default([]),
  place: PlaceSchema,
  pictures: z.array(PicturesReqSchema),
});

export const EpisodeUpdateReqSchema = EpisodeCreateReqSchema.extend({
  deletedPictureId: z.array(z.number()).optional(),
});

export const EpisodeResSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  date: z.string().min(1),
  mates: z.array(MateSchema.omit({ profileImage: true })).default([]),
  place: PlaceSchema.pick({ name: true }),
  pictures: z.array(EpisodePictureSchema),
  coverUrl: z.url(),
});

export const EpisodeItemSchema = EpisodeResSchema.extend({
  mates: z.array(MateSchema).default([]),
  place: PlaceSchema,
  pictures: z.array(EpisodePictureSchema),
  coverPictureId: z.number(),
}).omit({ coverUrl: true });

export const EpisodeListResSchema = z.object({
  episodes: z.array(EpisodeResSchema),
});

export const CheckTodayResSchema = z.object({
  hasTodayEpisode: z.boolean(),
});

export const DeleteEpisodeSchema = z.object({
  id: z.number(),
});

export type EpisodeReqBody = z.infer<typeof EpisodeCreateReqSchema>;
export type PlaceBody = z.infer<typeof PlaceSchema>;

export type EpisodeUpdateReqBody = z.infer<typeof EpisodeUpdateReqSchema>;

export type EpisodeListRes = z.infer<typeof EpisodeListResSchema>;
export type EpisodeType = z.infer<typeof EpisodeResSchema>;
export type EpisodeItemRes = z.infer<typeof EpisodeItemSchema>;

export type CheckTodayRes = z.infer<typeof CheckTodayResSchema>;
export type EpisodePictureType = z.infer<typeof EpisodePictureSchema>;

export type DeleteEpisodeReq = z.infer<typeof DeleteEpisodeSchema>;

export type EpisodeReqImageType = z.infer<typeof PicturesReqSchema>;
