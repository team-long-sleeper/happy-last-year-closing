import useEpisodeDataStore from '@/stores/episodeDataStore';
import { formatSingleDate } from '@common/DateInput';
import Link from 'next/link';

export default function AddTodayEpisode() {
  const { setDate } = useEpisodeDataStore();

  const onClickAddToday = () => {
    setDate(new Date());
  };

  return (
    <div className="w-full flex flex-col items-center pt-10 px-4">
      <div className="w-full text-2xl text-primary pb-4">
        {formatSingleDate(new Date(), 'number')}
      </div>
      <Link href={'/episode/write'} onClick={onClickAddToday}>
        <div className="bg-primary-diamond-gradient size-87.5 text-white flex justify-center items-center">
          오늘의 에피소드 기록하기
        </div>
      </Link>
    </div>
  );
}
