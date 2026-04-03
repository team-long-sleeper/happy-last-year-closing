import { getEpisodeListQueryFn } from '@/query/episodes';
import { episodesKeys } from '@/query/key/episodes';
import { useQuery } from '@tanstack/react-query';
import { isSameDay } from 'date-fns';
import { useSession } from 'next-auth/react';
import AddTodayEpisode from './AddTodayEpisode';
import EpisodeList from './EpisodeList';
import DotsLoader from '@components/common/loading/DotsLoader';
import Link from 'next/link';
import QuickButton from '@components/common/buttons/QuickButton';
import { useEffect, useState } from 'react';

export default function Episodes() {
  const [scrollY, setScrollY] = useState<number>(0);

  const { data: session } = useSession();

  const { data: listData, status: listStatus } = useQuery({
    queryKey: episodesKeys.base,
    queryFn: getEpisodeListQueryFn,
    enabled: !session?.user.needServiceLogin,
  });

  const handleDocumentScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    if (typeof window === undefined) return;

    document.addEventListener('scroll', handleDocumentScroll);

    return () => {
      document.removeEventListener('scroll', handleDocumentScroll);
    };
  }, []);

  return (
    <>
      {listStatus === 'success' && listData ? (
        <div className="pt-15 pb-30">
          {listData.episodes.length === 0 || !isSameDay(listData.episodes[0].date, new Date()) ? (
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
          transform: scrollY > 40 ? 'translateY(0%)' : 'translateY(120%)',
        }}
      >
        <Link href={'/episode/write'}>
          <QuickButton />
        </Link>
      </div>
    </>
  );
}
