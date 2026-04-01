import { AddIcon, CalendarIcon, MateIcon, PlaceIcon, TagIcon } from '@assets/icons';
import { IconComponentType } from '@type/mates.types';
import Icon from '../Icon';

export type FilterType = 'DATE' | 'MATE' | 'TAG' | 'PLACE' | 'EMPTY';

interface TagProps {
  type: FilterType;
  label?: string;
}

export default function Filter({ type, label }: TagProps) {
  const filterIcon: Record<FilterType, IconComponentType> = {
    DATE: CalendarIcon,
    MATE: MateIcon,
    PLACE: PlaceIcon,
    TAG: TagIcon,
    EMPTY: AddIcon,
  };

  return (
    <div className="shrink-0 flex gap-2 px-3 py-1 text-sm justify-center items-center border border-text-default rounded-lg">
      <Icon icon={filterIcon[type]} iconColor="default" size="s" />
      {label && <div>{label}</div>}
    </div>
  );
}
