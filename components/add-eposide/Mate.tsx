import { IconComponentType, Mate, Social } from '@/types/mates.types';
import { NaverLogo, KakaoLogo } from '@assets/images';
import Icon from '@components/common/Icon';

interface MateProps {
  onClickFn: () => void;
  isSelected: boolean;
  mate: Mate;
}

export default function MateList({ onClickFn, mate, isSelected }: MateProps) {
  const icon: Record<Social, IconComponentType> = {
    KAKAO: KakaoLogo,
    NAVER: NaverLogo,
    GOOGLE: KakaoLogo,
  };

  return (
    <div
      onClick={onClickFn}
      className={`flex w-full justify-between px-3 py-1 cursor-pointer select-none ${isSelected ? 'bg-primary text-white' : 'text-text-default bg-white'}`}
    >
      <div>{mate.name}</div>
      <div className="flex flex-col gap-3">
        {mate.social?.map((s) => (
          <Icon icon={icon[s]} size="s" key={s} />
        ))}
      </div>
    </div>
  );
}
