import { EpisodeImages, PlaceBody } from '@/types/episode.types';
import { Mate } from '@/types/mates.types';
import { create } from 'zustand';

export type EpisodeDataState = {
  title: string;
  memo: string;
  date: Date | null;
  place: PlaceBody | undefined;
  mates: Map<string, Mate>;
  pictures: EpisodeImages[] | null;
  deletedPictureId?: number[];
};

export type EpisodeDataStateAction = {
  setTitle: (title: string) => void;
  setMemo: (memo: string) => void;
  setDate: (date: Date | null) => void;
  setPlace: (place: PlaceBody | undefined) => void;
  setMates: (mate: Map<string, Mate>) => void;
  setPictures: (pictures: EpisodeImages[] | null) => void;
  setDeletedPictureId: (id: number) => void;
  resetEpisodeData: () => void;
};

const initialState = {
  title: '',
  memo: '',
  date: new Date(),
  place: undefined,
  mates: new Map(),
  pictures: null,
  deletedPictureId: [],
};

const useEpisodeDataStore = create<EpisodeDataState & EpisodeDataStateAction>((set) => ({
  ...initialState,
  setTitle: (title: string) => set({ title }),
  setMemo: (memo: string) => set({ memo }),
  setDate: (date: Date | null) => set({ date }),
  setPlace: (place: PlaceBody | undefined) => set({ place }),
  setMates: (mates: Map<string, Mate>) => set({ mates }),
  setPictures: (pictures: EpisodeImages[] | null) => set({ pictures }),
  setDeletedPictureId: (id: number) =>
    set((state) => {
      const prev = state.deletedPictureId ? [...state.deletedPictureId] : [];
      return { deletedPictureId: [...prev, id] };
    }),
  resetEpisodeData: () => set(initialState),
}));

export default useEpisodeDataStore;
