import { isSameDay } from "date-fns";
import { create } from "zustand";

type MetaDataState = {
  dates: Date[];
  places: { lat: number; lng: number }[];
};

type MeataDataStateAction = {
  setDate: (date: Date) => void;
  setplaces: (place: { lat: number; lng: number }) => void;
  resetMetadata: () => void;
};

const initialMetaDataState: MetaDataState = {
  dates: [],
  places: [],
};

const useImageMetaData = create<MetaDataState & MeataDataStateAction>(
  (set) => ({
    ...initialMetaDataState,
    setDate: (date: Date) =>
      set((state) => {
        if (state.dates) {
          const newDates = state.dates.find((d) => isSameDay(d, date))
            ? state.dates
            : [...state.dates, date];
          return { dates: newDates };
        }
        return { dates: [date] };
      }),

    setplaces: (place: { lat: number; lng: number }) =>
      set((state) => {
        if (state.places) {
          const newPlaces = state.places.find(
            (p) => p.lat === place.lat && p.lng === place.lng
          )
            ? state.places
            : [...state.places, place];
          return { places: newPlaces };
        }
        return { places: [place] };
      }),
    resetMetadata: () => set(initialMetaDataState),
  })
);

export default useImageMetaData;
