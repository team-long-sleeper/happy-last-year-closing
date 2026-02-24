'use client';
import { KakaoLogo } from '@assets/images';
import { signIn } from 'next-auth/react';

export default function LoginButton() {
  const onClickBtn = () => {
    signIn('kakao', { callbackUrl: '/' });
  };
  return (
    <div
      onClick={onClickBtn}
      className="bg-[#FEE500] rounded-md flex py-2.75 px-3.5 items-center max-w-75 cursor-pointer"
    >
      <div className="relative w-4.5 h-4.5">
        <KakaoLogo />
      </div>
      <div className="w-full flex justify-center">
        <span>카카오 로그인</span>
      </div>
    </div>
  );
}
