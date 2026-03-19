'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { bffClient } from '@/lib/axios/instances';
import EpisodeList from './EpisodeList';
import AnimatedCount from '@common/AnimatedCount';
import ServiceTitle from '@components/title/ServiceTitle';
import { isSameDay } from 'date-fns';
import AddTodayEpisode from './AddTodayEpisode';
import QuickButton from '@components/common/buttons/QuickButton';
import Link from 'next/link';
import DotsLoader from '@components/common/loading/DotsLoader';
import { episodesKeys } from '@/query/key/episodes';
import { getEpisodeListQueryFn } from '@/query/episodes';

export default function HomePageComponent() {
  const [active, setActive] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);
  const { data: session, update: updateSession } = useSession();

  const { isSuccess } = useQuery({
    queryKey: ['session'],
    queryFn: async () =>
      await bffClient.post('/auth/login', { userId: session?.user.serviceUserId }),
    enabled: !!session?.user.needServiceLogin,
  });

  const { data: listData, status: listStatus } = useQuery({
    queryKey: episodesKeys.base,
    queryFn: getEpisodeListQueryFn,
    enabled: !session?.user.needServiceLogin,
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
        {active ? (
          <>
            <div
              className="text-primary pb-2 transition-all duration-500"
              style={{ paddingTop: scrollY > 40 ? '0px' : '20px' }}
            >
              <div
                className={`flex flex-col w-full gap-2 items-center px-5 fixed z-20 pointer-events-none`}
              >
                <div
                  className={`transition-all duration-250 ease-out h-full overflow-hidden `}
                  style={{
                    height: scrollY > 40 ? 0 : '100%',
                    display: scrollY > 40 ? 'none' : 'block',
                  }}
                >
                  내가 함께한 에피소드
                </div>
                <span
                  className="text-3xl font-extralight transition-all duration-500 ease-out  "
                  style={{ fontSize: scrollY > 40 ? '1.6rem' : '' }}
                >
                  <AnimatedCount target={listData?.episodes.length ?? 0} />
                </span>
              </div>
            </div>

            {listStatus === 'success' && listData ? (
              <div className="pt-23 pb-30">
                {listData.episodes.length === 0 ||
                !isSameDay(listData.episodes[0].date, new Date()) ? (
                  <AddTodayEpisode />
                ) : null}
                <EpisodeList episodes={listData.episodes} />
              </div>
            ) : (
              <div className="flex items-center justify-center w-full absolute bottom-1/2">
                <DotsLoader />
              </div>
            )}
            <div
              className="fixed bottom-4 right-4 transition-all duration-500 ease-in-out w-fit h-fit"
              style={{
                transform: scrollY > 300 ? 'translateY(0%)' : 'translateY(120%)',
              }}
            >
              <Link href={'/episode/write'}>
                <QuickButton />
              </Link>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
