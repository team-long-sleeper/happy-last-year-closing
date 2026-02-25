import { Mate } from '@/types/mates.types';
import { SearchIcon } from '@assets/icons';
import Icon from '@components/common/Icon';
import { useState } from 'react';
import MateList from './Mate';
import PrimaryButton from '@components/buttons/PrimaryButton';
import { useMutation, useQuery } from '@tanstack/react-query';
import friendsService from '@/app/api/friends/client';
import axios from 'axios';

interface SearchMatesProps {
  selected: Map<string, Mate>;
  onToggleMate: (mate: Mate) => void;
}

export default function SearchMates({ selected, onToggleMate }: SearchMatesProps) {
  const [searchName, setSearchName] = useState<string>('');
  const [searchResult, setSearchResult] = useState<Mate[]>([]);
  const { data } = useQuery({
    queryKey: ['contacts'],
    queryFn: () => {
      console.log('query');
      return friendsService.getContacts();
    },
  });

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
    // 사용자의 친구 목록에서 검색 결과 set
  };

  // todo da

  const onClickAddFriends = () => {
    mutation.mutate();
  };

  const mutation = useMutation({
    mutationFn: () => axios.post('/api/friends', { name: searchName }),
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="border-2 border-primary flex justify-end">
        <input
          type="search"
          className="w-full pl-3 outline-none"
          value={searchName}
          onChange={onChangeSearchInput}
        />
        <div className=" py-2 px-3">
          <Icon icon={SearchIcon} />
        </div>
      </div>

      {searchName !== '' && searchResult.length === 0 ? (
        <div>
          <div className="flex justify-center items-center p-6 text-primary/50">
            검색결과가 없습니다.
          </div>
          <PrimaryButton onClickFunc={onClickAddFriends}>
            &lsquo;{searchName}&rsquo;을 친구 목록에 추가하기
          </PrimaryButton>
        </div>
      ) : (
        <div className="flex gap-2 flex-col">
          {data ? (
            <>
              {data.map((mate) => {
                return (
                  <MateList
                    onClickFn={() => onToggleMate(mate)}
                    key={mate.name}
                    mate={mate}
                    isSelected={selected.has(mate.id)}
                  />
                );
              })}
            </>
          ) : null}
        </div>
      )}
    </div>
  );
}
