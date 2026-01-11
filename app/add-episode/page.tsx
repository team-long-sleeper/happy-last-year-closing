'use client';
import Icon from '@/components/common/Icon';
import Header from '@/components/title/Header';
import BookmarkIcon from '@assets/icons/bookmark.svg';
import CalendarIcon from '@assets/icons/calendar_today.svg';
import PlaceIcon from '@assets/icons/place.svg';
import DateInput from '@/components/common/DateInput';
import AddImage from '@/components/add-eposide/AddImage';

export default function AddEpisode() {
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

      <div className="flex items-center gap-4 pl-25.5 pr-5 pb-12">
        <Icon src={CalendarIcon} size="m" content="에피소드 날짜" />
        <DateInput />
      </div>

      <div className="flex items-center gap-4 pl-25.5 pr-5 pb-12">
        <Icon src={PlaceIcon} size="m" content="에피소드 장소" />
        <span className="text-2xl text-primary opacity-25">에피소드 장소</span>
      </div>

      <div className="gap-4 pl-18.75 pr-5 pb-12">
        <AddImage />
      </div>
    </div>
  );
}
