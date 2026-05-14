import useEpisodeDataStore from '@/stores/episodeDataStore';
import Link from 'next/link';
import DateTitle from './DateTitle';

export default function AddTodayEpisode() {
  const { setDate } = useEpisodeDataStore();

  const onClickAddToday = () => {
    setDate(new Date());
  };

  return (
    <div className="pt-10">
      <DateTitle date={new Date()} />
      <Link href={'/episode/write'} onClick={onClickAddToday}>
        <div className="bg-primary-diamond-gradient size-87.5 text-white flex justify-center items-center">
          오늘의 에피소드 기록하기
        </div>
      </Link>
    </div>
  );
}
