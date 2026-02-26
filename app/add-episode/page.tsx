'use client';
import Icon from '@components/common/Icon';
import Header from '@components/title/Header';
import DateInput, { formatSingleDate } from '@components/common/DateInput';
import AddImage from '@components/add-eposide/AddImage';
import useImageMetaData from '@/stores/imageMetaDataStore';
import useEpisodeDataStore from '@/stores/add-/episodeDataStore';
import { BookmarkIcon, CalendarIcon, PlaceIcon } from '@assets/icons';
import { isSameDay } from 'date-fns';
import AddFriends from '@components/add-eposide/AddMates';
import PrimaryButton from '@components/buttons/PrimaryButton';
import { useEffect, useState } from 'react';

export default function AddEpisode() {
  const [isReadyToAdd, setIsReadyToAdd] = useState<boolean>(false);
  const { dates } = useImageMetaData();
  const { date: episodeDate, setDate: setEpisodeDate } = useEpisodeDataStore();

  const onHandleClickRecommendDate = (date: Date) => {
    if (!episodeDate || !episodeDate.from || !episodeDate.to) {
      return setEpisodeDate({ from: date, to: date });
    }

    const isSameSingleClick = isSameDay(date, episodeDate.from) && isSameDay(date, episodeDate.to);
    const selectFromEdge = isSameDay(date, episodeDate.from);
    const selectToEdge = isSameDay(date, episodeDate.to);

    let nextDates: { from: Date; to: Date } | null = null;

    if (isSameSingleClick) {
      nextDates = null;
    } else if (selectFromEdge) {
      nextDates = { from: episodeDate.to, to: episodeDate.to };
    } else if (selectToEdge) {
      nextDates = { from: episodeDate.from, to: episodeDate.from };
    } else if (episodeDate.from < date) {
      nextDates = { from: episodeDate.from, to: date };
    } else {
      nextDates = { from: date, to: episodeDate.to };
    }

    setEpisodeDate(nextDates);
  };

  return (
    <div className="h-dvh">
      <Header title="에피소드 추가하기" />
      <div className="flex items-center gap-4 pl-25.5 pr-5 pb-12">
        <Icon icon={BookmarkIcon} />
        <input
          className="text-2xl w-full placeholder:text-primary-sub outline-none text-text-default"
          placeholder="에피소드 제목"
        />
      </div>
      <div className="flex items-center gap-4 flex-col  pb-12">
        <div className="w-full flex h-fit items-center gap-4 pl-25.5">
          <Icon icon={CalendarIcon} />

          <DateInput />
        </div>

        {dates.length > 0 && (
          <div className="w-full gap-1 flex  pl-35.5 overflow-y-scroll">
            {dates.map((date, index) => {
              const recommand = formatSingleDate(date, 'number');
              return (
                <div
                  onClick={() => onHandleClickRecommendDate(date)}
                  key={index}
                  className={`w-fit text-sm text-gray-600 border border-primary rounded-2xl px-3 py-1 whitespace-nowrap shrink-0 ${
                    (episodeDate?.from && isSameDay(date, episodeDate.from)) ||
                    (episodeDate?.to && isSameDay(date, episodeDate.to))
                      ? 'bg-primary text-white'
                      : ''
                  }`}
                >
                  {recommand}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="flex items-center gap-4 pl-25.5 pr-5 pb-12 ">
        <Icon icon={PlaceIcon} />
        <span className="text-2xl text-primary-sub">에피소드 장소</span>
      </div>
      <div className="flex flex-col w-full gap-2 pb-12">
        <AddImage />
      </div>
      <div className="flex items-center gap-2 flex-col w-full">
        <AddFriends />
      </div>
      <PrimaryButton isBottomBtn isDisabled={!isReadyToAdd}>
        추가하기
      </PrimaryButton>
    </div>
  );
}
