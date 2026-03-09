import Icon from '../common/Icon';
import ImageUploader from '../uploaders/ImageUploader';
import Image from 'next/image';
import { ImageIcon } from '@assets/icons';
import useEpisodeDataStore from '@/stores/add-/episodeDataStore';

export default function AddImage() {
  const { pictures } = useEpisodeDataStore();

  return (
    <div className="flex flex-col w-full gap-2 pb-12">
      <div className="w-full flex">
        <span className="text-3xl font-extralight text-primary pl-17 text-right">
          {pictures ? pictures.length : 0}/5
        </span>
      </div>

      <div className="flex items-start gap-4 pl-25.5">
        <Icon icon={ImageIcon} />

        <div className="flex w-fit gap-2 overflow-y-scroll pr-12">
          {pictures ? (
            <>
              {pictures.map((image, index) => (
                <Image
                  width={106}
                  height={106}
                  src={image.preview}
                  className="size-26.5 object-cover shrink-0 border border-primary"
                  key={index}
                  alt={image.name}
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
