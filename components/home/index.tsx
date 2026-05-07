'use client';

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { bffClient } from '@/lib/axios/instances';
import Episodes from './Episodes';
import SumUp from './SumUp';
import WithHeaderLayout from '@components/layouts/withHeader';
import Landing from '../common/Landing';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';

type MainContentType = 'EPISODES' | 'SUM-UP';

let hasShownIntro = false;

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
  const [active, setActive] = useState(hasShownIntro);
  const [showOverlay, setShowOverlay] = useState(!hasShownIntro);
  const [mainContent, setMaincontent] = useState<MainContentType>('EPISODES');
  const [introBounce, setIntroBounce] = useState(false);
  const { push } = useRouter();
  const { data: session, update: updateSession } = useSession();

  const { isSuccess } = useQuery({
    queryKey: ['session'],
    queryFn: async () =>
      await bffClient.post('/auth/login', { userId: session?.user.serviceUserId }),
    enabled: !!session?.user.needServiceLogin,
  });

  const isPendingDeletion = session?.user.status === 'ACCOUNT_DELETION_PENDING';

  useEffect(() => {
    if (isPendingDeletion) {
      push('/restore');
    }
  }, [isPendingDeletion, push]);

  useEffect(() => {
    if (
      session?.user.needServiceLogin ||
      session?.user.status === 'ACCOUNT_DELETION_PENDING' ||
      hasShownIntro
    )
      return;

    const timer = setTimeout(() => {
      setActive(true);
      hasShownIntro = true;
    }, 500);

    return () => clearTimeout(timer);
  }, [session?.user.needServiceLogin]);

  const handleUpdateSession = async (update: Partial<Session>) => {
    await updateSession(update);
  };

  //     await updateSession({ user: { needServiceLogin: false } });

  useEffect(() => {
    if (!isSuccess || !session?.user.needServiceLogin) return;

    handleUpdateSession({ user: { needServiceLogin: false } });
  }, [isSuccess, session?.user.needServiceLogin]);

  const onTransitionEnd = () => {
    setShowOverlay(false);
    setIntroBounce(true);
    setTimeout(() => setIntroBounce(false), 900);
  };

  if (isPendingDeletion) {
    return null;
  }

  return (
    <>
      {showOverlay && <Landing isMounted={active} onTransitionEndFn={onTransitionEnd} />}

      <WithHeaderLayout
        doTitleBounce={introBounce}
        stickyBottom={
          <div className="flex">
            {TABS.map(({ key, label }) => {
              const isActive = key === mainContent;
              return (
                <div
                  key={key}
                  onClick={() => setMaincontent(key)}
                  className={`cursor-pointer hover:text-primary-accent active:text-primary-accent px-4 py-2 ${isActive ? 'text-primary font-medium border-b' : 'text-primary-sub'} `}
                >
                  {label}
                </div>
              );
            })}
          </div>
        }
      >
        {TABS.find((item) => item.key === mainContent)?.content}
      </WithHeaderLayout>
    </>
  );
}
