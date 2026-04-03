import useGetEpisodeQuery from '@/query/episodes/useGetEpisode.query';
import useEpisodeDataStore from '@/stores/add-/episodeDataStore';
import { ChangeEvent, useEffect } from 'react';

export default function AddMemo() {
  const { memo, setMemo } = useEpisodeDataStore();
  const { data: editingEpisode } = useGetEpisodeQuery();
  const length = memo.length;
  const MAX_LENGTH = 100;

  useEffect(() => {
    if (!editingEpisode) return;
    setMemo(editingEpisode.memo);
  }, [editingEpisode]);

  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { target } = e;
    setMemo(target.value);
  };
  return (
    <div className=" flex pb-9 pl-26 w-full pr-5">
      <div className="relative w-full">
        <textarea
          onChange={onChangeHandler}
          className="w-full placeholder:text-primary-sub outline-none"
          placeholder="기억나는 일, 먹었던 메뉴, 재밌었던 대화"
          maxLength={MAX_LENGTH}
          value={memo}
        />
        <span className="absolute right-0 -bottom-4 text-gray-500 text-right text-xs">
          {length}/{MAX_LENGTH}
        </span>
      </div>
    </div>
  );
}
