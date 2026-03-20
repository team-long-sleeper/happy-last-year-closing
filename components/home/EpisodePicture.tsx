import { EpisodePictureType } from '@type/episode.types';
import ImageSlider from './ImageSlider';
import ImageIndicator from './ImageIndicator';
import { useState } from 'react';

interface EpisodePictureProps {
  images: EpisodePictureType[];
}

export default function EpisodePicture({ images }: EpisodePictureProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <div className="relative flex flex-col gap-3 z-0">
      <ImageSlider images={images} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
      <ImageIndicator images={images} currentIndex={currentIndex} />
    </div>
  );
}
