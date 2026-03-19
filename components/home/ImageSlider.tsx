import { useImageSlider } from '@/hooks/useImageSlider';
import { EpisodePictureType } from '@type/episode.types';
import Image from 'next/image';

interface ImageSliderProps {
  images: EpisodePictureType[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

export default function ImageSlider({ images, currentIndex, setCurrentIndex }: ImageSliderProps) {
  const { dragOffset, handlers } = useImageSlider(images.length, currentIndex, setCurrentIndex);

  return (
    <div className="min-w-87.5 min-h-87.5 overflow-hidden" {...handlers}>
      <div
        className={`flex w-full h-87.5 ${dragOffset === 0 ? 'transition-transform ease-in-out duration-300' : ''}`}
        style={{
          width: `${images.length * 100}%`,
          transform: `translateX(calc(-${currentIndex * (100 / images.length)}% + ${dragOffset}px))`,
        }}
      >
        {images.map((img, index) => {
          return (
            <div
              key={index}
              className="relative w-full h-87.5"
              style={{ width: `${100 / images.length}%` }}
            >
              <Image
                loading="eager"
                draggable={false}
                src={img.url}
                alt={`${img.order}번 째 이미지`}
                fill
                className="absolute object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
