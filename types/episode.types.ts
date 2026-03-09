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

export const Place = z.object({
  providerId: z.string(),
  name: z.string(),
  address: z.string(),
  lat: z.number(),
  lng: z.number(),
  url: z.string(),
});

export const CreateEpisodeSchema = z.object({
  title: z.string().min(1),
  date: z.iso.datetime(),
  matesId: z.array(z.string()).default([]),
  place: Place,
  coverIndex: z.number().int().nonnegative(),
  pictureKeys: z.array(z.string().min(1)).min(1).max(50),
});

export type CreateEpisodeReq = z.infer<typeof CreateEpisodeSchema>;
export type PlaceBody = z.infer<typeof Place>;
