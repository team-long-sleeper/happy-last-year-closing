import { IconComponentType } from '@/types/mates.types';

interface IconProps {
  icon: IconComponentType;
  size?: 's' | 'm' | 'l';
  onClickFunc?: () => void;
  iconColor?: string;
  hoverColor?: string;
}

export default function Icon({
  icon: SVGComponent,
  onClickFunc,
  iconColor = 'primary',
  hoverColor = 'white',
  size = 'm',
}: IconProps) {
  const sizeClass = {
    s: 'w-3 h-3',
    m: 'w-6 h-6',
    l: 'w-8 h-8',
  }[size];

  const colorClass = `text-${iconColor} hover:text-${hoverColor}`;

  return (
    <div
      onClick={onClickFunc}
      className={`${onClickFunc ? ' hover:bg-primary cursor-pointer' : ''}`}
    >
      <SVGComponent className={`${sizeClass} ${colorClass}`} />
    </div>
  );
}
