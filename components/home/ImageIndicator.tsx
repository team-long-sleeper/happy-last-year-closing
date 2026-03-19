import { EpisodePictureType } from '@type/episode.types';

interface ImageIndicatorProps {
  images: EpisodePictureType[];
  currentIndex: number;
}

export default function ImageIndicator({ images, currentIndex }: ImageIndicatorProps) {
  if (images.length > 1)
    return (
      <div className="flex items-center gap-3 w-full justify-center">
        {Array.from({ length: images.length }, (_, index) => (
          <div
            key={index}
            className="rounded-full size-2 border border-primary"
            style={{
              backgroundColor: currentIndex === index ? '#ff5454' : 'transparent',
            }}
          ></div>
        ))}
      </div>
    );
}
