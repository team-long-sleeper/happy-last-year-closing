import { PlaceIcon } from '@assets/icons';
import Icon from '@components/common/Icon';

export default function AddPlace() {
  return (
    <div className="flex items-center gap-4 pl-25.5 pr-5 pb-12 ">
      <Icon icon={PlaceIcon} />
      <span className="text-2xl text-primary-sub">에피소드 장소</span>
    </div>
  );
}
