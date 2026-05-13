'use client';
import { useRef } from 'react';
import Icon from '../common/Icon';
import * as exifr from 'exifr';
import imageCompression from 'browser-image-compression';
import { AddIcon } from '@assets/icons';
import useImageMetaData from '@/stores/imageMetaDataStore';
import useEpisodeDataStore from '@/stores/episodeDataStore';
import { toast } from '@/toast';
import { MAX_PICTURES } from '@/lib/constants';

// 1920px 이하 / JPEG q85 정도면 폰 화면에서 차이 거의 못 느끼면서 80~95% 사이즈 절감.
// useWebWorker 로 메인 스레드 블로킹 방지 (UI 멈춤 방지).
const COMPRESSION_OPTIONS = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  initialQuality: 0.85,
  useWebWorker: true,
};

// 압축 실패 시 원본으로 fallback. 라이브러리 버그 / 특수 포맷 / OOM 같은 케이스 대비.
async function compressSafely(file: File): Promise<File> {
  try {
    return await imageCompression(file, COMPRESSION_OPTIONS);
  } catch (e) {
    console.warn('image compression failed, falling back to original', e);
    return file;
  }
}

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

    const currentCount = pictures?.length ?? 0;
    const remaining = Math.max(0, MAX_PICTURES - currentCount);

    const selected = Array.from(files);
    const accepted = selected.slice(0, remaining);
    const trimmed = selected.length - accepted.length;

    if (trimmed > 0) {
      const msg =
        accepted.length === 0
          ? `사진은 최대 ${MAX_PICTURES}장까지 업로드할 수 있어요.`
          : `사진은 ${MAX_PICTURES}장까지만 가능해서 ${trimmed}장은 제외했어요.`;
      toast(msg, 'ERROR');
    }

    if (accepted.length > 0) {
      handleFiles(accepted);
      accepted.forEach(extractMetadata);
    }

    // 같은 파일을 다시 선택할 수 있도록 input 초기화
    e.target.value = '';
  };

  const handleFiles = async (files: File[]) => {
    const uploadedImages = await Promise.all(
      files.map(async (file, index) => {
        const order = (pictures?.length ?? 0) + (index + 1);

        // 1. HEIC → JPEG (browser-image-compression 이 HEIC 디코드 못 함 → 먼저 변환).
        let converted = file;
        if (file.type === 'image/heic' || file.name.endsWith('.heic')) {
          const { default: heic2any } = await import('heic2any');
          const convertedBlob = await heic2any({
            blob: file,
            toType: 'image/jpeg',
            quality: 0.9,
          });
          converted = new File([convertedBlob as Blob], file.name.replace(/\.heic$/i, '.jpg'), {
            type: 'image/jpeg',
          });
        }

        // 2. 리사이즈 + 압축. Netlify 10s / 모바일 대역폭 안에 들어오도록.
        const compressed = await compressSafely(converted);

        return {
          url: URL.createObjectURL(compressed),
          name: file.name,
          file: compressed,
          order,
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
        multiple
        onChange={onChangeFile}
        className="hidden"
      />
    </div>
  );
}
