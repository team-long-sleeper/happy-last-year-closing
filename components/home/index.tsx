'use client';

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { bffClient } from '@/lib/axios/instances';
import ServiceTitle from '@components/title/ServiceTitle';
import Episodes from './Episodes';
import SumUp from './SumUp';

type MainContentType = 'EPISODES' | 'SUM-UP';

const TABS: Array<{
  key: MainContentType;
  label: string;
  index: number;
  content: React.ReactNode;
}> = [
  { key: 'EPISODES', label: 'episodes', index: 0, content: <Episodes /> },
  { key: 'SUM-UP', label: 'sum-up', index: 1, content: <SumUp /> },
];

export default function HomePageComponent() {
  const [active, setActive] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);
  const [mainContent, setMaincontent] = useState<MainContentType>('EPISODES');
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

  const handleDocumentScroll = () => {
    setScrollY(window.scrollY);
  };

  const handleDocumentTouchMove = () => {
    // console.log(e);
  };

  useEffect(() => {
    if (typeof window === undefined) return;

    document.addEventListener('scroll', handleDocumentScroll);
    document.addEventListener('touchmove', handleDocumentTouchMove);

    return () => {
      document.removeEventListener('scroll', handleDocumentScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`fixed w-dvw h-dvh bg-primary-diamond-gradient transform-all duration-700 ease-in-out -z-10 ${
          active ? 'translate-y-full' : ''
        }`}
      />
      <div className="w-full h-full relative">
        <div
          className={`w-full flex items-center transition-[height] duration-700 ease-in-out  ${
            active ? 'h-23.75' : 'h-full'
          }`}
        >
          <div
            id="bg"
            className="w-full h-80 fixed pointer-events-none z-10"
            style={{
              background:
                scrollY > 40
                  ? 'linear-gradient(#ffffff 63%, #ffffffdc 75%, transparent)'
                  : undefined,
            }}
          />
          <ServiceTitle titleColor={active ? 'text-primary' : 'text-white'} />
        </div>
        <div className="z-50 w-full flex justify-center fixed">
          <div className="relative w-28 h-9">
            {TABS.map(({ key, label }, i) => {
              const isActive = key === mainContent;
              const isScrolled = scrollY > 40;
              const activeIndex = TABS.findIndex((t) => t.key === mainContent);
              // w-28(112px) + gap-3(12px) = 124px
              const tx = !isActive ? (i - activeIndex) * 124 : 0;

              return (
                <div
                  key={key}
                  onClick={() => setMaincontent(key)}
                  style={{ transform: `translateX(${tx}px)` }}
                  className={`absolute inset-x-0 cursor-pointer rounded-full flex items-center justify-center transition-all duration-300 ease-out ${
                    isActive
                      ? isScrolled
                        ? 'bg-transparent text-primary text-sm py-0'
                        : 'border-2 border-solid border-primary bg-primary text-white py-1.5'
                      : isScrolled
                        ? 'border-2 border-dashed border-primary bg-transparent text-primary text-sm py-0 opacity-0 pointer-events-none'
                        : 'border-2 border-dashed border-primary bg-white text-primary py-1.5'
                  }`}
                >
                  {label}
                </div>
              );
            })}
          </div>
        </div>
        {active ? <>{TABS.find((item) => item.key === mainContent)?.content}</> : null}
      </div>
    </>
  );
}
