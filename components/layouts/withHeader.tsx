'use client';

import { MenuIcon } from '@assets/icons';
import Icon from '@components/common/Icon';
import ServiceTitle from '@components/title/ServiceTitle';
import dynamic from 'next/dynamic';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const Menu = dynamic(() => import('@components/common/Menu'), { ssr: false });

interface HeaderBounceProps {
  doTitleBounce: boolean;
  stickyBottom?: React.ReactNode;
  showMenu?: boolean;

  children: React.ReactNode;
}

export default function WithHeaderLayout({
  doTitleBounce,
  stickyBottom,
  showMenu = true,
  children,
}: HeaderBounceProps) {
  const path = usePathname();
  const { push } = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onClickHeader = () => {
    if (path === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
    else push('/');
  };

  return (
    <div className="w-full min-h-dvh relative">
      <div className="sticky top-0 z-40 bg-white w-full">
        <div className="py-5 w-fit mx-auto cursor-pointer" onClick={onClickHeader}>
          <ServiceTitle bounce={doTitleBounce} />
        </div>
        {showMenu && (
          <div className="pr-4 absolute right-0 cursor-pointer" onClick={() => setIsMenuOpen(true)}>
            <Icon icon={MenuIcon} />
          </div>
        )}

        {stickyBottom}
      </div>
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      {children}
    </div>
  );
}
