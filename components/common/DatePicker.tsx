import { useDeviceHeight } from '@/hooks/useDeviceHeight';
import useGetEpisodeQuery from '@/query/episodes/useGetEpisode.query';
import useEpisodeDataStore from '@/stores/episodeDataStore';
import { addDays, endOfMonth, format, isSameDay, startOfMonth } from 'date-fns';
import { ko } from 'date-fns/locale';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Button from './buttons/Button';
import { formatSingleDate } from './DateInput';

function buildMonthDays(month: Date): (Date | null)[] {
  const first = startOfMonth(month);
  const last = endOfMonth(month);
  const days: (Date | null)[] = Array(first.getDay()).fill(null);
  let cur = first;
  while (cur <= last) {
    days.push(new Date(cur.getTime()));
    cur = addDays(cur, 1);
  }
  return days;
}

type MonthGridProps = {
  month: Date;
  selected: Date | null;
  today: Date;
  onSelect: (d: Date) => void;
  gridHeight: number;
};

const MonthGrid = memo(
  function MonthGrid({ month, selected, today, onSelect, gridHeight }: MonthGridProps) {
    const days = buildMonthDays(month);
    const numWeeks = Math.ceil(days.length / 7);
    const rowHeight = gridHeight > 0 ? Math.floor(gridHeight / numWeeks) : 56;

    return (
      <div>
        <div className="grid grid-cols-7">
          {days.map((day, i) => {
            if (!day)
              return (
                <div
                  key={`e${i}`}
                  style={{ height: rowHeight }}
                  className="border-t border-zinc-100"
                />
              );

            const sel = selected ? isSameDay(day, selected) : false;
            const tod = isSameDay(day, today);
            const first = day.getDate() === 1;

            return (
              <button
                key={day.getDate()}
                type="button"
                onClick={() => onSelect(day)}
                style={{ height: rowHeight }}
                className={[
                  'relative flex text-sm text-center w-full border-t border-zinc-100 hover:bg-zinc-100',
                  sel && 'bg-primary! text-white! hover:bg-primary/80!',
                  tod && !sel && 'font-bold text-white',
                  !sel && day.getDay() === 0 && 'text-primary!',
                  !sel && day.getDay() === 6 && 'text-blue-700!',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {first && (
                  <span className="absolute -top-6 text-sm leading-none  text-zinc-400 font-normal">
                    {format(day, 'M월', { locale: ko })}
                  </span>
                )}
                <div className="relative p-2 w-full h-fit z-5">
                  {day.getDate()}
                  {tod && !sel ? (
                    <div className="-z-5 absolute left-1/2 top-0 -translate-x-1/2 bg-primary size-8 rounded-full" />
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  },
  (prev, next) => {
    if (prev.month.getTime() !== next.month.getTime()) return false;
    if (prev.today.getTime() !== next.today.getTime()) return false;
    if (prev.gridHeight !== next.gridHeight) return false;

    const inMonth = (d: Date | null) =>
      !!d && d.getFullYear() === next.month.getFullYear() && d.getMonth() === next.month.getMonth();

    const wasIn = inMonth(prev.selected);
    const isIn = inMonth(next.selected);
    if (wasIn !== isIn) return false;
    if (wasIn && isIn && prev.selected!.getDate() !== next.selected!.getDate()) return false;

    return true;
  },
);

const SCROLL_BUFFER = 2;
// approx height of fixed UI outside the scroll area (modal title + sticky header + button)
const GRID_OFFSET = 200;

interface DatePickerProps {
  onConfirmFn: () => void;
}

export default function DatePicker({ onConfirmFn }: DatePickerProps) {
  const [visibleMonthLabel, setVisibleMonthLabel] = useState('');
  const [visibleRange, setVisibleRange] = useState(() => {
    const idx = new Date().getMonth();
    return {
      start: Math.max(0, idx - SCROLL_BUFFER),
      end: Math.min(11, idx + SCROLL_BUFFER),
    };
  });
  const [draft, setDraft] = useState<Date | null>(null);
  const { data: editingEpisode } = useGetEpisodeQuery();
  const { date, setDate } = useEpisodeDataStore();

  const scrollRef = useRef<HTMLDivElement>(null);
  const deviceHeight = useDeviceHeight();

  const today = useMemo(() => new Date(), []);
  const previewDate = useMemo(
    () => draft ?? (editingEpisode ? new Date(editingEpisode.date) : date),
    [draft, editingEpisode, date],
  );

  const gridHeight = deviceHeight ? deviceHeight - GRID_OFFSET : 0;
  const previewDisplay = previewDate ? formatSingleDate(previewDate) : undefined;

  const months = useMemo(() => {
    const arr: Date[] = [];
    for (let i = 0; i < 12; i++) {
      arr.push(new Date(today.getFullYear(), i, 1));
    }
    return arr;
  }, [today]);

  const findMonthIndex = useCallback(
    (d: Date) =>
      months.findIndex((m) => m.getFullYear() === d.getFullYear() && m.getMonth() === d.getMonth()),
    [months],
  );

  const { monthHeights, monthOffsets, totalHeight } = useMemo(() => {
    if (!gridHeight) return { monthHeights: [], monthOffsets: [], totalHeight: 0 };
    const monthHeights = months.map(() => gridHeight);
    const monthOffsets = months.map((_, i) => i * gridHeight);
    const totalHeight = months.length * gridHeight;
    return { monthHeights, monthOffsets, totalHeight };
  }, [months, gridHeight]);

  const scrollToToday = useCallback(() => {
    const target = today;
    const idx = findMonthIndex(target);
    if (idx !== -1 && scrollRef.current) {
      scrollRef.current.scrollTo({ top: monthOffsets[idx], behavior: 'smooth' });
    }
  }, [today, findMonthIndex, monthOffsets]);

  const onSelectDraft = useCallback((d: Date) => setDraft(d), []);

  const handleConfirm = useCallback(() => {
    if (previewDate) setDate(previewDate);
    setDraft(null);
    onConfirmFn();
  }, [previewDate, setDate, onConfirmFn]);

  const updateLabel = useCallback(() => {
    const scrollTop = scrollRef.current?.scrollTop ?? 0;
    let lo = 0,
      hi = months.length - 1,
      cur = 0;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (monthOffsets[mid] <= scrollTop + 4) {
        cur = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
    setVisibleMonthLabel(format(months[cur], 'yyyy년 M월', { locale: ko }));
  }, [months, monthOffsets]);

  const updateVisibleRange = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const { scrollTop, clientHeight } = container;

    // binary search: first month whose bottom edge is below scrollTop
    let first = months.length - 1;
    let lo = 0,
      hi = months.length - 1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (monthOffsets[mid] + monthHeights[mid] > scrollTop) {
        first = mid;
        hi = mid - 1;
      } else {
        lo = mid + 1;
      }
    }

    let last = first;
    while (last < months.length - 1 && monthOffsets[last + 1] < scrollTop + clientHeight) {
      last++;
    }

    setVisibleRange({
      start: Math.max(0, first - SCROLL_BUFFER),
      end: Math.min(months.length - 1, last + SCROLL_BUFFER),
    });
  }, [months, monthOffsets, monthHeights]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const target = previewDate ?? today;
    const idx = findMonthIndex(target);

    let rafId: number;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        updateLabel();
        updateVisibleRange();
      });
    };
    const timerId = setTimeout(() => {
      if (idx !== -1) container.scrollTop = monthOffsets[idx];
      updateLabel();
      updateVisibleRange();
      container.addEventListener('scroll', onScroll, { passive: true });
    }, 50);

    return () => {
      clearTimeout(timerId);
      cancelAnimationFrame(rafId);
      container.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="flex flex-col h-full">
      <button
        type="button"
        onClick={scrollToToday}
        className="fixed bottom-19 right-4 z-10 size-20 bg-white rounded-full border border-primary text-sm text-primary font-medium active:bg-primary active:text-white active:scale-90 cursor-pointer"
      >
        오늘
      </button>
      {/* sticky header */}
      <div className="shrink-0 px-5 border-b border-zinc-100">
        <div className="flex items-center justify-between py-2">
          <span className="text-xl pb-3">{visibleMonthLabel}</span>
        </div>
        <div className="grid grid-cols-7 text-sm pb-2 text-center">
          {['일', '월', '화', '수', '목', '금', '토'].map((d, i) => (
            <span
              key={d}
              className={i === 0 ? 'text-primary' : i === 6 ? 'text-blue-700' : 'text-zinc-400'}
            >
              {d}
            </span>
          ))}
        </div>
      </div>

      {/* virtual scroll calendar */}
      <div ref={scrollRef} className="overflow-y-auto flex-1 px-4">
        <div style={{ height: totalHeight, position: 'relative' }}>
          {months.map((month, i) => {
            if (i < visibleRange.start || i > visibleRange.end) return null;
            return (
              <div
                key={month.getTime()}
                style={{ position: 'absolute', top: monthOffsets[i], left: 0, right: 0 }}
              >
                <MonthGrid
                  month={month}
                  selected={previewDate}
                  today={today}
                  onSelect={onSelectDraft}
                  gridHeight={gridHeight}
                />
              </div>
            );
          })}
        </div>
      </div>
      <Button buttonType="PRIMARY" onClickFunc={handleConfirm}>
        {previewDisplay}로 선택하기
      </Button>
    </div>
  );
}
