'use client';

import { format, isSameDay } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { DateRange, DayPicker } from 'react-day-picker';
import { enUS } from 'date-fns/locale';
import useEpisodeDataStore from '@/stores/add-/episodeDataStore';

type InputProps = {
  placeholder?: string;
};

export const DATE_FORMAT = {
  display: 'MMMMMM dd',
  number: 'MM/dd',
} as const;

export type DateFormatKey = keyof typeof DATE_FORMAT;

export function formatSingleDate(date: Date, formatKey: DateFormatKey = 'display') {
  return format(date, DATE_FORMAT[formatKey], { locale: enUS });
}

export function checkDateRange(dateRange: DateRange) {
  const { from, to } = dateRange;
  if (!from || !to) return undefined;

  const isSingleDate = isSameDay(from, to);

  if (isSingleDate) return formatSingleDate(from);
  else return `${formatSingleDate(from)} ~ ${formatSingleDate(to)}`;
}

export default function DateInput({ placeholder = '에피소드 날짜' }: InputProps) {
  const [open, setOpen] = useState(false);
  const { date, setDate } = useEpisodeDataStore();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const onBlurDatePicker = () => {
    setOpen(false);
  };

  const onClickClear = () => {
    setDate(null);
  };

  const display = date ? checkDateRange(date) : undefined;
  const defaultMonth = date?.from ?? new Date(2025, 0);

  return (
    <div className="flex flex-col">
      <div ref={ref} className=" w-full">
        <div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={[
              'w-full text-left',
              'flex items-center justify-between gap-2',
              'focus:outline-none',
            ].join(' ')}
            aria-haspopup="dialog"
            aria-expanded={open}
          >
            <span className={`text-primary-sub text-2xl ${date ? 'text-text-default' : ''}`}>
              {display || placeholder}
            </span>
          </button>

          {open && (
            <div
              onClick={onBlurDatePicker}
              className="fixed inset-0 z-40 flex items-center justify-center bg-black/20"
            >
              <div
                role="dialog"
                aria-label="Date picker"
                onClick={(e) => e.stopPropagation()}
                className="fixed z-50 mt-2 bg-white p-3 shadow-lg border  "
              >
                <DayPicker
                  mode="range"
                  locale={enUS}
                  selected={date || undefined}
                  autoFocus
                  hideNavigation
                  onSelect={(d) => {
                    if (d) {
                      setDate(d);
                    }
                  }}
                  defaultMonth={defaultMonth}
                  captionLayout="dropdown"
                  formatters={{
                    formatWeekdayName: (weekday, options) => {
                      return format(weekday, 'EEEEE', options);
                    },
                  }}
                  classNames={{
                    month: 'space-y-3',
                    table: 'w-full border-collapse mt-2',
                    head_row: 'flex border!',
                    day: 'w-10 h-10 hover:bg-primary text-center',
                    day_selected: 'bg-black text-white hover:bg-black focus:bg-black',
                    day_today: 'border border-zinc-300 ',
                    day_button: ' w-full h-full hover:cursor-pointer hover:text-white',
                    day_outside: 'text-zinc-300 bg-white!',
                    nav: 'w-full flex justify-between',
                    button_next: 'hover:fill-primary hover:cursor-pointer',
                    button_previous: 'hover:fill-primary hover:cursor-pointer',
                    months_dropdown: 'focus:outline-none text-center hover:cursor-pointer',
                    caption_label: 'hidden',
                    dropdowns: 'flex justify-center items-center p-2 text-lg flex-row-reverse',
                    disabled: 'border',
                    range_middle: 'bg-primary text-white',
                    range_start: 'bg-primary text-white font-bold',
                    range_end: 'bg-primary text-white font-bold',
                    hidden: 'hover:bg-white bg-white',
                    weekdays: 'text-xs',
                    weeks: 'mt-4',
                  }}
                />

                <div className="mt-3 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    className="text-sm text-zinc-600 hover:text-zinc-900"
                    onClick={onClickClear}
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    className="rounded-md bg-primary px-3 py-1.5 text-sm text-white hover:bg-black/90"
                    onClick={() => setOpen(false)}
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
