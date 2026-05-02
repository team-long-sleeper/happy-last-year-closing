import { IconComponentType } from '@type/mates.types';
import { SizeVariant } from '@type/ui.types';
import Icon from '../Icon';

interface ListProps {
  icon?: IconComponentType;
  isDisabled?: boolean;
  label: string;
  onClickFn?: () => void;
  size?: SizeVariant;
}

export default function List({
  label,
  icon,
  onClickFn,
  isDisabled = false,
  size = 'm',
}: ListProps) {
  const listSize: Record<SizeVariant, string> = {
    s: 'py-1 px-2 gap-2 text-sm',
    m: 'py-4 px-2 gap-4',
    l: 'py-6 px-3 gap-4',
  };

  return (
    <div
      onClick={onClickFn}
      className={`${listSize[size]} flex items-center ${!isDisabled ? 'text-text-default hover:text-primary active:text-primary active:bg-gray/25 cursor-pointer' : 'text-gray'}`}
    >
      {icon ? <Icon icon={icon} iconColor={!isDisabled ? 'default' : 'gray'} size={size} /> : null}
      {label}
    </div>
  );
}
