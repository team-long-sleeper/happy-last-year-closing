import { EpisodeListRes } from '@/types/episode.types';
import { MateIcon, PlaceIcon } from '@assets/icons';
import { formatSingleDate } from '@common/DateInput';
import Icon from '@common/Icon';
import Image from 'next/image';

export default function EpisodeList({ episodes }: EpisodeListRes) {
  return (
    <>
      {episodes.map((item, index) => {
        return (
          <div key={index} className="w-full flex flex-col items-center pt-8">
            <div className="text-2xl text-primary pb-4">
              {formatSingleDate(new Date(item.date), 'number')}
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-primary text-center">{item.title}</div>
              <div className="flex gap-3 items-center">
                <div className="flex gap-1 items-center">
                  <Icon icon={PlaceIcon} iconColor="text-default" size="s" />
                  {item.place.name}
                </div>
                <div className="border-l h-3 border-text-default/40" />
                <div className="flex items-center gap-1">
                  <Icon icon={MateIcon} size="s" iconColor="text-default" />
                  <div className="flex">
                    {item.mates.map((mate, index) => {
                      return (
                        <div key={mate.id}>
                          {mate.name}
                          {index !== item.mates.length - 1 ? ',' : ''}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="relative size-87.5">
              <Image src={item.coverUrl} alt={item.title} fill className="absolute object-cover" />
            </div>
          </div>
        );
      })}
    </>
  );
}
