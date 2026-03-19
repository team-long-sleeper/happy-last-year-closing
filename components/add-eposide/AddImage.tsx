import Icon from '../common/Icon';
import ImageUploader from '../uploaders/ImageUploader';
import Image from 'next/image';
import { ImageIcon } from '@assets/icons';
import useEpisodeDataStore from '@/stores/add-/episodeDataStore';
import useGetEpisodeQuery from '@/query/episodes/useGetEpisode.query';
import { useEffect } from 'react';
import { EpisodeImages } from '@type/episode.types';

export default function AddImage() {
  const { pictures, setPictures } = useEpisodeDataStore();
  const { data: editingEpisode } = useGetEpisodeQuery();

  useEffect(() => {
    if (!editingEpisode) return;
    const editingPictures: EpisodeImages[] = editingEpisode.pictures.map((item) => {
      return {
        id: item.id,
        order: item.order,
        src: item.url,
      };
    });
    setPictures(editingPictures);
  }, [editingEpisode]);

  return (
    <div className="relative flex flex-col w-full gap-2 pb-12">
      <div className="flex items-start gap-4 pl-16">
        <div className="relative">
          <Icon icon={ImageIcon} />

          <span className="absolute right-0 top-7.5 text-primary text-right">
            {pictures ? pictures.length : 0}/5
          </span>
        </div>

        <div className="flex w-fit gap-2 overflow-y-scroll pr-12">
          {pictures ? (
            <>
              {pictures.map((image, index) => (
                <Image
                  width={106}
                  height={106}
                  src={image.src}
                  className="size-26.5 object-cover shrink-0 border border-primary"
                  key={index}
                  alt={image.name ?? `${image.id}`}
                />
              ))}
            </>
          ) : null}
          <ImageUploader />
        </div>
      </div>
    </div>
  );
}
