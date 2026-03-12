import { formatSingleDate } from '@common/DateInput';
import Link from 'next/link';

export default function AddTodayEpisode() {
  return (
    <div className="w-full flex flex-col items-center pt-8">
      <div className="text-2xl text-primary pb-4">{formatSingleDate(new Date(), 'number')}</div>
      <Link href={'/add-episode'}>
        <div className="bg-primary-diamond-gradient size-87.5 text-white flex justify-center items-center">
          오늘의 에피소드 기록하기
        </div>
      </Link>
    </div>
  );
}
