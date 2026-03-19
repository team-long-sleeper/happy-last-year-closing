import useEpisodeDataStore from '@/stores/add-/episodeDataStore';
import useImageMetaData from '@/stores/imageMetaDataStore';
import { CalendarIcon } from '@assets/icons';
import DateInput, { formatSingleDate } from '@common/DateInput';
import Icon from '@common/Icon';
import { isSameDay } from 'date-fns';

export default function AddDates() {
  const { dates: datesFromImage } = useImageMetaData();
  const { date: episodeDate, setDate: setEpisodeDate } = useEpisodeDataStore();

  const onHandleClickRecommendDate = (selectedDate: Date) => {
    if (episodeDate && isSameDay(episodeDate, selectedDate)) return;
    setEpisodeDate(selectedDate);
  };

  return (
    <div className="flex items-center gap-4 flex-col  pb-12">
      <div className="w-full flex h-fit items-center gap-4 pl-16">
        <Icon icon={CalendarIcon} />
        <DateInput />
      </div>

      {datesFromImage.length > 0 && (
        <div className="w-full gap-1 flex  pl-35.5 overflow-y-scroll">
          {datesFromImage.map((date, index) => {
            const recommand = formatSingleDate(date, 'number');
            return (
              <div
                onClick={() => onHandleClickRecommendDate(date)}
                key={index}
                className={`w-fit text-sm text-gray-600 border border-primary rounded-2xl px-3 py-1 whitespace-nowrap shrink-0 ${
                  episodeDate && isSameDay(date, episodeDate) ? 'bg-primary text-white' : ''
                }`}
              >
                {recommand}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
