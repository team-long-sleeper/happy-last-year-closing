"use client";
import AddIcon from "@assets/icons/add.svg";
import { useRef } from "react";
import Icon from "../common/Icon";
import * as exifr from "exifr";
import { UploadedImage } from "@/types/episode.types";
import useImageMetaData from "@/stores/imageMetaDataStore";
import { set } from "date-fns";

interface ImageUploaderProps {
  images: UploadedImage[] | null;
  setImages: (file: UploadedImage[]) => void;
}

export default function ImageUploader({
  images,
  setImages,
}: ImageUploaderProps) {
  const { setDate, setplaces } = useImageMetaData();
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
        if (file.type === "image/heic" || file.name.endsWith(".heic")) {
          const { default: heic2any } = await import("heic2any");
          const convertedBlob = await heic2any({
            blob: file,
            toType: "image/jpeg",
            quality: 0.9,
          });

          const convertedFile = new File(
            [convertedBlob as Blob],
            file.name.replace(/\.heic$/i, ".jpg"),
            { type: "image/jpeg" }
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
      })
    );

    const newImages = images ? [...images, ...uploadedImages] : uploadedImages;

    setImages(newImages);
  };

  const extractMetadata = async (file: File) => {
    // 날짜 위치 추출
    // 날짜 있으면 전역 스토어에 날짜 넣기
    // 위치 있으면 전역 스토어에 위치 넣기

    const data = await exifr.parse(file, {
      tiff: true,
      exif: true,
      gps: true,
    });

    const date =
      data?.DateTimeOriginal ||
      data?.CreateDate ||
      data?.ModifyDate ||
      new Date(file.lastModified) ||
      null;

    const gps =
      data?.latitude && data?.longitude
        ? { lat: data.latitude, lng: data.longitude }
        : null;

    if (date) setDate(date);
    if (gps) setplaces(gps);
  };

  return (
    <div className="size-26.5">
      <div
        onClick={onClickUpload}
        className="bg-primary size-26.5 h-full flex items-center justify-center "
      >
        <Icon src={AddIcon} size="m" content="에피소드 사진 추가" />
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
