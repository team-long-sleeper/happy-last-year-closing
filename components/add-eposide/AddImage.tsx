import Icon from '../common/Icon';
import ImageUploader from '../uploaders/ImageUploader';
import { ImageIcon } from '@assets/icons';
import useEpisodeDataStore from '@/stores/add-/episodeDataStore';
import useGetEpisodeQuery from '@/query/episodes/useGetEpisode.query';
import { useEffect } from 'react';
import { EpisodeImages } from '@type/episode.types';
import EpisodeImagesContainer from './EpisodeImagesContainer';

export default function AddImage() {
  const { pictures, setPictures } = useEpisodeDataStore();
  const { data: editingEpisode } = useGetEpisodeQuery();

  useEffect(() => {
    if (!editingEpisode) return;
    const editingPictures: EpisodeImages[] = editingEpisode.pictures.map((item) => {
      return {
        id: item.id,
        order: item.order,
        url: item.url,
      };
    });
    setPictures(editingPictures);
  }, [editingEpisode]);

  return (
    <div className="relative flex flex-col w-full gap-2 pb-9">
      <div className="flex items-start gap-4 pl-16">
        <div className="relative">
          <Icon icon={ImageIcon} />

          <span className="absolute right-0 top-7.5 text-primary text-right">
            {pictures ? pictures.length : 0}/5
          </span>
        </div>

        <div className="flex w-fit overflow-x-scroll overflow-y-hidden gap-2 pr-12">
          <EpisodeImagesContainer />
          <ImageUploader />
        </div>
      </div>
    </div>
  );
}
