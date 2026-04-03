import { CloseIcon } from '@assets/icons';
import Icon from '../Icon';
import { TagType } from '@type/tag.type';

interface TagProps {
  label: string;
  color: string;
  onClick?: (() => void) | ((tag: TagType) => void);
  onClickDelete?: (() => void) | ((label: string) => void);
  twStyle?: string;
}

export default function Tag({ label, color, onClick, onClickDelete, twStyle }: TagProps) {
  return (
    <div
      onClick={onClick ? () => onClick({ label, color }) : undefined}
      className={`${onClickDelete ? 'pl-3 pr-2' : 'px-3'}  py-1 flex items-center gap-1 text-sm shrink-0 rounded-full w-fit ${onClick ? 'cursor-pointer' : ''} ${twStyle}`}
      style={{ backgroundColor: `${color}` }}
    >
      <span>{label}</span>

      {onClickDelete ? (
        <div
          className=" cursor-pointer h-6 w-6 flex justify-center items-center"
          onClick={onClickDelete ? () => onClickDelete(label) : undefined}
        >
          <Icon icon={CloseIcon} size="s" iconColor="default" />
        </div>
      ) : null}
    </div>
  );
}
