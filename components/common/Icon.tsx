import { IconComponentType } from '@/types/mates.types';
import { SizeVariant } from '@type/ui.types';

interface IconProps {
  icon: IconComponentType;
  size?: SizeVariant;
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
  const sizeClass: Record<SizeVariant, string> = {
    s: 'w-3 h-3',
    m: 'w-6 h-6',
    l: 'w-8 h-8',
  };

  const colorClass = `text-${iconColor} hover:text-${hoverColor}`;

  return (
    <div
      onClick={onClickFunc}
      className={`${onClickFunc ? ' hover:bg-primary cursor-pointer' : ''} active:bg-gray/25`}
    >
      <SVGComponent className={`${sizeClass[size]} ${colorClass}`} />
    </div>
  );
}
