import { Mate } from '@/types/mates.types';
import { CloseIcon } from '@assets/icons';
import Icon from '@common/Icon';
import Image from 'next/image';
import React, { useState } from 'react';

interface MateProfileProps {
  mate: Mate;
  onToggleMate?: (mate: Mate) => void;
}

export default function MateProfile({ mate, onToggleMate }: MateProfileProps) {
  const [isHover, setIsHover] = useState<boolean>(false);

  const onHoverToggle = (e: React.MouseEvent) => {
    const { type } = e;
    if (type === 'mouseenter') return setIsHover(true);
    if (type === 'mouseleave') return setIsHover(false);
  };

  return (
    <div className={`gap-3 flex flex-col items-center`}>
      <div
        className="size-17 bg-white rounded-full relative"
        onMouseEnter={onHoverToggle}
        onMouseLeave={onHoverToggle}
      >
        {isHover ? (
          <div
            className="bg-primary absolute z-10 size-17 rounded-full cursor-pointer"
            onClick={onToggleMate ? () => onToggleMate(mate) : undefined}
          >
            <div className="flex justify-center items-center h-full">
              <Icon icon={CloseIcon} iconColor="white" />
            </div>
          </div>
        ) : (
          <Image
            src={mate.profileImage}
            alt={`${mate.name}님의 프로필 사진`}
            fill
            className="object-contain"
          />
        )}
      </div>
      <div className="text-body-l">{mate.name}</div>
    </div>
  );
}
