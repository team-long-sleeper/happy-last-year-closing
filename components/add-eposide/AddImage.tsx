import { useState } from 'react';
import Icon from '../common/Icon';
import ImageUploader from '../uploaders/ImageUploader';
import ImageIcon from '@assets/icons/image.svg';
import Image from 'next/image';
import { UploadedImage } from '@/types/episode.types';

export default function AddImage() {
  const [images, setImages] = useState<UploadedImage[] | null>(null);
  return (
    <>
      <span className="text-3xl font-extralight text-primary">{images ? images.length : 0}/4</span>
      <div className="flex items-start gap-4 ">
        <Icon src={ImageIcon} size="m" content="에피소드 사진" />
        {images ? (
          <>
            {images.map((image, index) => (
              <Image
                width={106}
                height={106}
                src={image.preview}
                className="size-26.5 "
                key={index}
                alt={image.name}
              />
            ))}
          </>
        ) : null}
        <ImageUploader images={images} setImages={setImages} />
      </div>
    </>
  );
}
