'use client';

import { ImageError } from '@assets/images';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

export default function ImageWithFallback({ alt, ...rest }: ImageProps) {
  const [isError, setIsError] = useState<boolean>(false);

  if (isError)
    return (
      <div className="text-primary size-full flex justify-center items-center flex-col">
        <ImageError className="size-40 text-gray-400" />
      </div>
    );
  else return <Image {...rest} alt={alt} onError={() => setIsError(true)} />;
}
