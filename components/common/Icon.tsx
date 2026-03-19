import { IconComponentType } from '@/types/mates.types';

interface IconProps {
  icon: IconComponentType;
  size?: 's' | 'm' | 'l';
  onClickFunc?: () => void;
  iconColor?: string;
}

export default function Icon({
  icon: SVGComponent,
  onClickFunc,
  iconColor = 'primary',
  size = 'm',
}: IconProps) {
  const sizeClass = {
    s: 'w-3 h-3',
    m: 'w-6 h-6',
    l: 'w-8 h-8',
  }[size];

  const colorClass = `text-${iconColor}`;

  return (
    <div
      onClick={onClickFunc}
      className={`${onClickFunc ? ' hover:bg-primary cursor-pointer' : ''}`}
    >
      <SVGComponent
        className={`${sizeClass} text-primary ${onClickFunc ? ' hover:text-white' : ''} ${colorClass}`}
      />
    </div>
  );
}
