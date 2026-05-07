import { Mate } from '@/types/mates.types';
import { useMemo, useState } from 'react';
import MateList from './Mate';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import friendsService from '@/app/api/friends/client';
import axios from 'axios';
import SearchInputField from '@common/SearchInputField';
import Button from '@components/common/buttons/Button';
import { useDeviceHeight } from '@/hooks/useDeviceHeight';
import { useIsMobile } from '@/hooks/useIsMobile';

interface SearchMatesProps {
  selected: Map<string, Mate>;
  onToggleMate: (mate: Mate) => void;
}

export default function SearchMates({ selected, onToggleMate }: SearchMatesProps) {
  const [searchName, setSearchName] = useState<string>('');
  const isMobile = useIsMobile();
  const deviceHeight = useDeviceHeight();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['mates'],
    queryFn: () => {
      return friendsService.getContacts();
    },
  });

  const filteredFriends = useMemo(() => {
    if (!data) return [];
    if (!searchName) return data;

    return data.filter((f) => f.name.toLowerCase().includes(searchName.toLowerCase()));
  }, [data, searchName]);

  const onClickAddFriends = async () => {
    await mutation.mutateAsync();
  };

  const mutation = useMutation({
    mutationFn: () => axios.post('/api/friends', { name: searchName }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mates'] });
    },
  });

  return (
    <div className="flex flex-col gap-6 h-full  flex-1 min-h-0">
      <SearchInputField
        value={searchName}
        onChange={setSearchName}
        placeholder="친구를 검색해보세요"
      />
      {searchName !== '' && filteredFriends.length === 0 ? (
        <div className=" h-full sm:h-40  overflow-scroll">
          <div className="flex justify-center items-center p-6 text-primary/50">
            검색결과가 없습니다.
          </div>
          <Button onClickFunc={onClickAddFriends}>
            &lsquo;{searchName}&rsquo;을 친구 목록에 추가하기
          </Button>
        </div>
      ) : (
        <div
          className="flex gap-2 flex-col overflow-scroll"
          style={{ height: isMobile ? `${deviceHeight - 460}px` : '160px' }}
        >
          {filteredFriends ? (
            <>
              {filteredFriends.map((mate) => {
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
