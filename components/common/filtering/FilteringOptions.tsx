import { FilterItem } from '@type/filter.types';
import Filter from './Filter';

export default function FilteringOptions() {
  const defaultFiltering: FilterItem[] = [
    { type: 'DATE', label: '기간', data: { startDate: null, endDate: null } },
    { type: 'MATE', label: '친구', data: [] },
    { type: 'TAG', label: '태그', data: [] },
    { type: 'PLACE', label: '장소', data: [] },
  ];
  return (
    <div className="w-full overflow-x-scroll flex gap-2 overflow-y-hidden">
      {defaultFiltering.map((item) => (
        <Filter
          key={item.label}
          type={item.type}
          label={'label' in item ? item.label : undefined}
        />
      ))}
    </div>
  );
}
