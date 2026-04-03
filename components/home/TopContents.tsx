import { MateIcon, PlaceIcon, RankingIcon, TagIcon } from '@assets/icons';
import Icon from '@components/common/Icon';
import ImageWithFallback from '@components/common/ImageWithFallback';
import { IconComponentType } from '@type/mates.types';

type ContentType = 'MATE' | 'PLACE' | 'TAG';

interface TopContentProps {
  type: ContentType;
  img: string;
  title: string;
  count: number;
  ranking: number;
}

export default function TopContent({ type, img, title, count, ranking }: TopContentProps) {
  const contentIcon: Record<ContentType, IconComponentType> = {
    MATE: MateIcon,
    PLACE: PlaceIcon,
    TAG: TagIcon,
  };

  return (
    <div className="w-37.5 shrink-0 relative">
      <div className="flex gap-1 pb-1">
        <Icon icon={contentIcon[type]} iconColor="default" />
        <div className="relative">
          <Icon icon={RankingIcon} />
          <div className="absolute top-1/2 z-10 left-1/2 -translate-1/2 text-white font-bold text-xs ">
            <span>{ranking}</span>
          </div>
        </div>
      </div>
      <div className=" border border-primary">
        <div className="h-17.5 relative">
          <ImageWithFallback
            src={img}
            fill
            loading="eager"
            sizes="350px"
            className="absolute object-cover"
            alt={`${title}`}
          />
        </div>

        <div className="p-2 flex justify-between">
          <span className="text-ellipsis">{title}</span>
          <span>{count}</span>
        </div>
      </div>
    </div>
  );
}
