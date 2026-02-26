import { ComponentType, SVGProps } from 'react';
export interface Mate {
  id: string;
  name: string;
  profileImage: string;
  social: Social[] | null;
}

export type Social = 'KAKAO' | 'GOOGLE' | 'NAVER';

// todo 위치 바꾸기
export type IconComponentType = ComponentType<SVGProps<SVGSVGElement>>;
