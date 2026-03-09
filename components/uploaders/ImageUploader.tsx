'use client';
import { useRef } from 'react';
import Icon from '../common/Icon';
import * as exifr from 'exifr';
import { AddIcon } from '@assets/icons';
import useImageMetaData from '@/stores/imageMetaDataStore';
import useEpisodeDataStore from '@/stores/add-/episodeDataStore';

export default function ImageUploader() {
  const { setDate, setplaces } = useImageMetaData();
  const { pictures, setPictures } = useEpisodeDataStore();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const onClickUpload = () => {
    fileRef.current?.click();
  };

  const onChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    handleFiles(files);

    [...files].map((item) => {
      extractMetadata(item);
    });
  };

  const handleFiles = async (fileList: FileList) => {
    const uploadedImages = await Promise.all(
      Array.from(fileList).map(async (file) => {
        if (file.type === 'image/heic' || file.name.endsWith('.heic')) {
          const { default: heic2any } = await import('heic2any');
          const convertedBlob = await heic2any({
            blob: file,
            toType: 'image/jpeg',
            quality: 0.9,
          });

          const convertedFile = new File(
            [convertedBlob as Blob],
            file.name.replace(/\.heic$/i, '.jpg'),
            { type: 'image/jpeg' },
          );

          return {
            original: file,
            preview: URL.createObjectURL(convertedFile),
            name: file.name,
            file: convertedFile,
          };
        }

        return {
          original: file,
          preview: URL.createObjectURL(file),
          name: file.name,
          file,
        };
      }),
    );

    const newImages = pictures ? [...pictures, ...uploadedImages] : uploadedImages;

    setPictures(newImages);
  };

  const extractMetadata = async (file: File) => {
    const data = await exifr.parse(file, {
      tiff: true,
      exif: true,
      gps: true,
    });

    const date: Date | null | undefined =
      data?.DateTimeOriginal ||
      data?.CreateDate ||
      data?.ModifyDate ||
      new Date(file.lastModified) ||
      null;

    const gps =
      data?.latitude && data?.longitude ? { lat: data.latitude, lng: data.longitude } : null;

    if (date) {
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);
      setDate(d);
    }

    if (gps) setplaces(gps);
  };

  return (
    <div className="size-26.5">
      <div
        onClick={onClickUpload}
        className="bg-primary size-26.5 h-full flex items-center justify-center cursor-pointer"
      >
        <Icon icon={AddIcon} />
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        max={4}
        multiple
        onChange={onChangeFile}
        className="hidden"
      />
    </div>
  );
}
