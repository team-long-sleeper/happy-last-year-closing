import { ImageMetaData } from '@/types/episode.types';
import { create } from 'zustand';

export type MetaDataState = {
  startDate: Date;
};

type MeataDataStateAction = {
  setMetaData: (metaData: ImageMetaData) => void;
};

const useMetaData = create<MetaDataState & MeataDataStateAction>((set) => ({
  metaData: null,
  setMetaData: (metaData: ImageMetaData) => set({ metaData }),
}));

export default useMetaData;
