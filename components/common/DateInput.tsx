'use client';

import { format } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { ko } from 'date-fns/locale';
import useEpisodeDataStore from '@/stores/add-/episodeDataStore';
import ModalLayer from '@common/modal';
import { Modal } from './modal/template';
import DatePicker from './DatePicker';

export const DATE_FORMAT = {
  display: 'MMMMMM d일',
  number: 'M/d E',
  detail: 'M/d EEEE',
} as const;

export type DateFormatKey = keyof typeof DATE_FORMAT;

export function formatSingleDate(date: Date, formatKey: DateFormatKey = 'display') {
  return format(date, DATE_FORMAT[formatKey], { locale: ko });
}

type InputProps = { placeholder?: string };

export default function DateInput({ placeholder = '에피소드 날짜' }: InputProps) {
  const [open, setOpen] = useState(false);
  const { date } = useEpisodeDataStore();

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [handleClose]);

  const display = date ? formatSingleDate(date) : undefined;

  return (
    <div className="flex flex-col">
      <div className="w-full">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="w-full text-left flex items-center justify-between gap-2 focus:outline-primary"
          aria-haspopup="dialog"
          aria-expanded={open}
        >
          <span className={`text-primary-sub text-xl ${date ? 'text-text-default' : ''}`}>
            {display || placeholder}
          </span>
        </button>

        <ModalLayer open={open} onClose={handleClose} mobileVariant="fullscreen">
          <Modal>
            <Modal.Title onClose={handleClose}>에피소드 날짜 선택하기</Modal.Title>
            <Modal.Content>
              <DatePicker onConfirmFn={handleClose} />
            </Modal.Content>
          </Modal>
        </ModalLayer>
      </div>
    </div>
  );
}
