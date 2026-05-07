import { WriteIcon } from '@assets/icons';
import Icon from '../Icon';

interface QuickButtonProps {
  onClickFn?: () => void;
}

export default function QuickButton({ onClickFn }: QuickButtonProps) {
  return (
    <div
      className="rounded-full bg-primary text-white size-20 flex items-center justify-center cursor-pointer active:bg-primary-accent"
      onClick={onClickFn}
    >
      <Icon icon={WriteIcon} iconColor="white" />
    </div>
  );
}
