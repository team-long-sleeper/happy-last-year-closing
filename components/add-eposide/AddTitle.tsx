import { BookmarkIcon } from '@assets/icons';
import Icon from '@components/common/Icon';

export default function AddTitle() {
  return (
    <div className="flex items-center gap-4 pl-25.5 pr-5 pb-12">
      <Icon icon={BookmarkIcon} />
      <input
        className="text-2xl w-full placeholder:text-primary-sub outline-none text-text-default"
        placeholder="에피소드 제목"
      />
    </div>
  );
}
