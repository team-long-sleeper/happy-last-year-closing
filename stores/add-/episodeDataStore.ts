import { DateRange } from "react-day-picker";
import { create } from "zustand";

export type EpisodeDataState = {
  title: string;
  date: DateRange | null;
  place: string;
};

export type EpisodeDataStateAction = {
  setTitle: (title: string) => void;
  setDate: (date: DateRange | null) => void;
  setPlace: (place: string) => void;
  resetEpisodeData: () => void;
};

const initialState = {
  title: "",
  date: null,
  place: "",
};

const useEpisodeDataStore = create<EpisodeDataState & EpisodeDataStateAction>(
  (set) => ({
    ...initialState,
    setTitle: (title: string) => set({ title }),
    setDate: (date: DateRange | null) => set({ date }),
    setPlace: (place: string) => set({ place }),
    resetEpisodeData: () => set(initialState),
  })
);

export default useEpisodeDataStore;
