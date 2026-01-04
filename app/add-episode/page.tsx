import Icon from '@/components/common/Icon';
import Header from '@/components/title/Header';
import BookmarkIcon from '../../assets/icons/bookmark.svg';
import CalendarIcon from '../../assets/icons/calendar_today.svg';
import ImageIcon from '../../assets/icons/image.svg';
import AddIcon from '../../assets/icons/add.svg';

export default function AddEpisode() {
  return (
    <div className="border-2 border-red-200 h-dvh">
      <Header title="에피소드 추가하기" />
      <div className="flex items-center gap-4 pl-25.5 pr-5 pb-12">
        <Icon src={BookmarkIcon} size="m" content="에피소드 제목" />
        <input
          className="border-red-500 w-full placeholder:opacity-25 placeholder:text-primary outline-none text-text-default"
          placeholder="에피소드 제목을 입력하세요."
        />
      </div>

      <div className="flex items-center gap-4 pl-25.5 pr-5 pb-12">
        <Icon src={CalendarIcon} size="m" content="에피소드 날짜" />
        <input
          className="border-red-500 w-full placeholder:opacity-25 placeholder:text-primary outline-none text-text-default"
          placeholder="에피소드 날짜를 선택하세요."
        />
      </div>

      <div className="gap-4 pl-18.75 pr-5 pb-12">
        <span className="text-3xl font-extralight text-primary">0/4</span>
        <div className="flex items-start gap-4 ">
          <Icon src={ImageIcon} size="m" content="에피소드 사진" />

          <div className="bg-primary size-26.5 flex items-center justify-center">
            <Icon src={AddIcon} size="m" content="에피소드 사진 추가" />
          </div>
        </div>
      </div>
    </div>
  );
}
