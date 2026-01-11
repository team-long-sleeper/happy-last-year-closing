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
