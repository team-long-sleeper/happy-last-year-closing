import { Mate } from '@/types/mates.types';
import { DateRange } from 'react-day-picker';
import { create } from 'zustand';

export type EpisodeDataState = {
  title: string;
  date: DateRange | null;
  place: string;
  mates: Map<string, Mate>;
};

export type EpisodeDataStateAction = {
  setTitle: (title: string) => void;
  setDate: (date: DateRange | null) => void;
  setPlace: (place: string) => void;
  setMates: (mate: Map<string, Mate>) => void;
  resetEpisodeData: () => void;
};

const initialState = {
  title: '',
  date: null,
  place: '',
  mates: new Map(),
};

const useEpisodeDataStore = create<EpisodeDataState & EpisodeDataStateAction>((set) => ({
  ...initialState,
  setTitle: (title: string) => set({ title }),
  setDate: (date: DateRange | null) => set({ date }),
  setPlace: (place: string) => set({ place }),
  setMates: (mates: Map<string, Mate>) => set({ mates }),
  resetEpisodeData: () => set(initialState),
}));

export default useEpisodeDataStore;
