import { KakaoLoginLogo } from '@assets/images';
import Image from 'next/image';

export default function LoginButton() {
  return (
    <div>
      <Image src={KakaoLoginLogo} fill alt="kakao logo" />
      <span>카카오 로그인</span>
    </div>
  );
}
