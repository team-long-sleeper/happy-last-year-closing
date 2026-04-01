export type DateFilterData = {
  startDate: string | null;
  endDate: string | null;
};

export type ContactFilterData = {
  id: string;
  name: string;
  profileImage: string;
};

export type PlaceFilterData = {
  id: number;
  name: string;
};

export type TagFilterData = {
  id: number;
  name: string;
};

export type DateFilterItem = {
  type: 'DATE';
  label: string;
  data: DateFilterData;
};

export type MateFilterItem = {
  type: 'MATE';
  label: string;
  data: ContactFilterData[];
};

export type PlaceFilterItem = {
  type: 'PLACE';
  label: string;
  data: PlaceFilterData[];
};

export type TagFilterItem = {
  type: 'TAG';
  label: string;
  data: TagFilterData[];
};

export type EmptyFilterItem = {
  type: 'EMPTY';
  label?: string;
};

export type FilterItem =
  | DateFilterItem
  | MateFilterItem
  | PlaceFilterItem
  | TagFilterItem
  | EmptyFilterItem;

/** FilterItem[]을 백엔드 query params로 변환한 결과 */
export type FilterQuery = {
  startDate?: string;
  endDate?: string;
  contactIds?: string; // comma-separated UUIDs
  placeIds?: string;   // comma-separated ints
  tagIds?: string;     // comma-separated ints
};
