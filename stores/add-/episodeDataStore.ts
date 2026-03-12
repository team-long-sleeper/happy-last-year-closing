import { UploadedImage } from '@/types/episode.types';
import { Mate } from '@/types/mates.types';
import { KakaoPlaceResponse } from '@/types/place.types';
import { create } from 'zustand';

export type EpisodeDataState = {
  title: string;
  date: Date | null;
  place: KakaoPlaceResponse | undefined;
  mates: Map<string, Mate>;
  pictures: UploadedImage[] | null;
};

export type EpisodeDataStateAction = {
  setTitle: (title: string) => void;
  setDate: (date: Date | null) => void;
  setPlace: (place: KakaoPlaceResponse | undefined) => void;
  setMates: (mate: Map<string, Mate>) => void;
  setPictures: (pictures: UploadedImage[] | null) => void;
  resetEpisodeData: () => void;
};

const initialState = {
  title: '',
  date: new Date(),
  place: undefined,
  mates: new Map(),
  pictures: null,
};

const useEpisodeDataStore = create<EpisodeDataState & EpisodeDataStateAction>((set) => ({
  ...initialState,
  setTitle: (title: string) => set({ title }),
  setDate: (date: Date | null) => set({ date }),
  setPlace: (place: KakaoPlaceResponse | undefined) => set({ place }),
  setMates: (mates: Map<string, Mate>) => set({ mates }),
  setPictures: (pictures: UploadedImage[] | null) => set({ pictures }),
  resetEpisodeData: () => set(initialState),
}));

export default useEpisodeDataStore;
