'use client';

import { bffClient } from '@/lib/axios/instances';
import PrimaryButton from '@components/buttons/PrimaryButton';
import ServiceTitle from '@components/title/ServiceTitle';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomePageComponent() {
  const [active, setActive] = useState(false);
  const { data: session, update: updateSession } = useSession();
  const { isSuccess } = useQuery({
    queryKey: ['session'],
    queryFn: async () =>
      await bffClient.post('/auth/login', { userId: session?.user.serviceUserId }),
    enabled: !!session?.user.needServiceLogin,
  });

  useEffect(() => {
    if (session?.user.needServiceLogin) return;

    const timer = setTimeout(() => {
      setActive(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [session?.user.needServiceLogin]);

  const handleUpdateSession = async () => {
    await updateSession({ user: { needServiceLogin: false } });
  };

  useEffect(() => {
    if (!isSuccess || !session?.user.needServiceLogin) return;

    handleUpdateSession();
  }, [isSuccess, session?.user.needServiceLogin]);

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
              <PrimaryButton isBottomBtn>에피소드 추가하기</PrimaryButton>
            </Link>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
