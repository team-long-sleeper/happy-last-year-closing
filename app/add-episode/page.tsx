"use client";
import Icon from "@/components/common/Icon";
import Header from "@/components/title/Header";
import DateInput, { formatSingleDate } from "@/components/common/DateInput";
import AddImage from "@/components/add-eposide/AddImage";
import useImageMetaData from "@/stores/imageMetaDataStore";
import useEpisodeDataStore from "@/stores/add-/episodeDataStore";
import {
  BookmarkIcon,
  CalendarIcon,
  PlaceIcon,
  MateIcon,
  AddIcon,
} from "@assets/icons";
import { isSameDay } from "date-fns";

export default function AddEpisode() {
  const { dates } = useImageMetaData();
  const { date: episodeDate, setDate: setEpisodeDate } = useEpisodeDataStore();

  const onHandleClickRecommendDate = (date: Date) => {
    if (!episodeDate || !episodeDate.from || !episodeDate.to) {
      return setEpisodeDate({ from: date, to: date });
    }

    const isSameSingleClick =
      isSameDay(date, episodeDate.from) && isSameDay(date, episodeDate.to);
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
        <Icon src={BookmarkIcon} size="m" content="에피소드 제목" />
        <input
          className="text-2xl w-full placeholder:opacity-25 placeholder:text-primary outline-none text-text-default"
          placeholder="에피소드 제목"
        />
      </div>

      <div className="flex items-center gap-4 flex-col  pb-12">
        <div className="w-full flex h-fit items-center gap-4 pl-25.5">
          <Icon src={CalendarIcon} size="m" content="에피소드 날짜" />

          <DateInput />
        </div>

        {dates.length > 0 && (
          <div className="w-full gap-1 flex  pl-35.5 overflow-y-scroll">
            {dates.map((date, index) => {
              const recommand = formatSingleDate(date, "number");
              return (
                <div
                  onClick={() => onHandleClickRecommendDate(date)}
                  key={index}
                  className={`w-fit text-sm text-gray-600 border border-primary rounded-2xl px-3 py-1 whitespace-nowrap shrink-0 ${
                    (episodeDate?.from && isSameDay(date, episodeDate.from)) ||
                    (episodeDate?.to && isSameDay(date, episodeDate.to))
                      ? "bg-primary text-white"
                      : ""
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
        <Icon src={PlaceIcon} size="m" content="에피소드 장소" />
        <span className="text-2xl text-primary opacity-25">에피소드 장소</span>
      </div>

      <div className="flex flex-col w-full gap-2 pb-12">
        <AddImage />
      </div>

      <div className="flex items-center gap-2 flex-col w-full">
        <div className="w-full">
          <span className="text-3xl font-extralight text-primary pl-26 text-right">
            0
          </span>
        </div>

        <div className="w-full flex items-start gap-4 pl-25.5">
          <Icon src={MateIcon} size="m" content="에피소드 친구" />
          <div className="size-17 bg-primary flex justify-center items-center rounded-full cursor-pointer">
            <Icon src={AddIcon} size="m" content="친구 추가하기" />
          </div>
        </div>
      </div>
    </div>
  );
}
