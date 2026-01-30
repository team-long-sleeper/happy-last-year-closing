'use client';
import { KakaoLoginLogo } from '@assets/images';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

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
        <Image src={KakaoLoginLogo} fill alt="kakao logo" className="absolute" />
      </div>
      <div className="w-full flex justify-center">
        <span>카카오 로그인</span>
      </div>
    </div>
  );
}
