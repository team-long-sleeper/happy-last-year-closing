'use client';

import { CloseIcon, DocIcon, MateIcon, PersonIcon, PlaceIcon, TagIcon } from '@assets/icons';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import Icon from './Icon';
import Link from 'next/link';
import List from './list';

type MenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MENU_TABS = [
  { label: '내 장소', icon: PlaceIcon, abled: false, link: '/places' },
  { label: '내 친구', icon: MateIcon, abled: false, link: '/mates' },
  { label: '내 태그', icon: TagIcon, abled: false, link: '/tags' },
  { label: '내 계정', icon: PersonIcon, abled: true, link: '/account' },
];

const DOCS = [
  { label: '서비스 이용약관', link: '/service' },
  {
    label: '개인정보 처리방침',
    link: '/privacy',
  },
];

export default function Menu({ isOpen, onClose }: MenuProps) {
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  return createPortal(
    <>
      <div
        className={`fixed inset-0 transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none overflow-hidden'
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed bottom-0 right-0 h-[calc(100dvh-109px)] w-full bg-white z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex w-fit justify-end absolute right-4 cursor-pointer" onClick={onClose}>
          <Icon icon={CloseIcon} />
        </div>
        <div className="pt-10 px-4">
          {MENU_TABS.map(({ label, icon, abled, link }) => (
            <Link
              onClick={onClose}
              key={label}
              href={link}
              className={`${!abled ? 'pointer-events-none' : ''}`}
              aria-disabled={!abled}
            >
              <List label={label} icon={icon} isDisabled={!abled} />
            </Link>
          ))}
        </div>
        <div className="absolute px-4 bottom-6 w-full flex flex-col gap-2">
          {DOCS.map(({ label, link }) => (
            <Link onClick={onClose} key={label} href={link}>
              <List size="s" label={label} icon={DocIcon} key={label} />
            </Link>
          ))}
        </div>
      </div>
    </>,
    document.body,
  );
}
