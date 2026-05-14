import { formatSingleDate } from '@components/common/DateInput';

interface DateTitleProps {
  date: Date;
}

export default function DateTitle({ date }: DateTitleProps) {
  return (
    <div className="text-2xl text-primary pb-4 w-full">
      {formatSingleDate(new Date(date), 'number')}
    </div>
  );
}
