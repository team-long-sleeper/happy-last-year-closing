import SearchInputField from '@components/common/SearchInputField';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { bffClient } from '@/lib/axios/instances';
import KakaoMap from './KakaoMap';
import PrimaryButton from '@components/buttons/PrimaryButton';
import Icon from '@components/common/Icon';
import { ArrowBackIcon, GuidePlaceIcon } from '@assets/icons';
import useEpisodeDataStore from '@/stores/add-/episodeDataStore';
import { KakaoPlaceResponse } from '@/types/place.types';

interface SearchPlaceProps {
  closeModal: () => void;
}

export default function SearchPlace({ closeModal }: SearchPlaceProps) {
  const [searchPlace, setSearchPlace] = useState<string>('');
  const [selected, setSelected] = useState<KakaoPlaceResponse>();
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
  const { setPlace } = useEpisodeDataStore();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setCoords({
        x: pos.coords.longitude,
        y: pos.coords.latitude,
      });
    });
  }, []);

  const onClickAddPlace = () => {
    if (!selected) return;
    setPlace(selected);
    closeModal();
  };

  const onClickPlace = (place: KakaoPlaceResponse) => {
    setSelected(place);
  };

  const { data } = useQuery({
    queryKey: ['place', searchPlace],
    queryFn: async () => {
      const res = await bffClient.get(`/map`, {
        params: { query: searchPlace, radius: 2000 },
      });
      return res.data;
    },
    enabled: !!searchPlace,
  });

  return (
    <>
      <div className="h-118 relative overflow-hidden">
        <div
          className={`px-5 h-full pb-30 border-b-2 border-primary absolute inset-0 overflow-hidden transform-all duration-700 ease-in-out ${selected ? '-translate-x-full pointer-events-none' : 'translate-x-0'}`}
        >
          <SearchInputField
            value={searchPlace}
            onChange={setSearchPlace}
            placeholder="장소를 검색해보세요"
          />
          <div className="mt-6 overflow-y-scroll h-full">
            {data ? (
              <>
                {data?.documents.map((place: KakaoPlaceResponse) => (
                  <div
                    key={place.id}
                    onClick={() => onClickPlace(place)}
                    className={`flex flex-col p-2 border-b border-gray-200 hover:bg-primary hover:[&>div]:text-white cursor-pointer `}
                  >
                    <div>{place.place_name}</div>
                    <div className="text-gray-300 text-sm">{place.road_address_name}</div>
                  </div>
                ))}
              </>
            ) : (
              <div className="w-full h-full flex justify-center items-center flex-col gap-3">
                <div className="size-30">
                  <GuidePlaceIcon />
                </div>
                <div className="text-primary">어떤 곳에서?</div>
              </div>
            )}
          </div>
        </div>

        <div
          className={`absolute inset-0 transform-all duration-700 ease-in-out ${selected ? 'translate-x-0' : 'translate-x-full pointer-events-none'}`}
        >
          <div className="flex flex-col justify-between h-full">
            <div
              onClick={() => {
                setSelected(undefined);
              }}
              className="flex gap-1 cursor-pointer justify-center items-center text-sm border-2 border-primary p-2 absolute z-50 bg-white left-2 top-2"
            >
              <Icon icon={ArrowBackIcon} size="s" /> 다시고르기
            </div>
            {selected ? <KakaoMap place={selected} /> : <div />}
            <PrimaryButton onClickFunc={onClickAddPlace}>
              {selected?.place_name} 추가하기
            </PrimaryButton>
          </div>
        </div>
      </div>
    </>
  );
}
