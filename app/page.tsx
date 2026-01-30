'use client';

import PrimaryButton from '@components/buttons/PrimaryButton';
import ServiceTitle from '@components/title/ServiceTitle';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActive(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div
        className={`fixed w-dvw h-dvh bg-primary-diamond-gradient transform-all duration-700 ease-in-out -z-10 ${
          active ? 'translate-y-full' : ''
        }`}
      />
      <div className="w-full h-full">
        <div
          className={`w-full flex items-center transition-[height] duration-700 ease-in-out  ${
            active ? 'h-23.75' : 'h-full'
          }`}
        >
          <ServiceTitle titleColor={active ? 'text-primary' : 'text-white'} />
        </div>
        {active ? (
          <>
            <div className="text-primary  pt-21.25 ">
              <div className="flex justify-between items-center  px-5">
                <span>내가 함께한 에피소드</span>
                <span className="text-3xl font-extralight">0</span>
              </div>
            </div>
            <Link href={'/add-episode'}>
              <PrimaryButton content="에피소드 추가하기" />
            </Link>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
