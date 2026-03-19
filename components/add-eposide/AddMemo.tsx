import useGetEpisodeQuery from '@/query/episodes/useGetEpisode.query';
import useEpisodeDataStore from '@/stores/add-/episodeDataStore';
import { ChangeEvent, useEffect, useState } from 'react';

export default function AddMemo() {
  const { memo, setMemo } = useEpisodeDataStore();
  const { data: editingEpisode } = useGetEpisodeQuery();
  const [length, setLength] = useState<number>(0);

  useEffect(() => {
    if (!editingEpisode) return;
    setMemo(editingEpisode.memo);
  }, [editingEpisode]);

  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { target } = e;
    setMemo(target.value);
    setLength(target.value.length);
  };
  return (
    <div className=" flex pb-12 pl-26 w-full pr-5">
      <div className="relative w-full">
        <textarea
          onChange={onChangeHandler}
          className="w-full placeholder:text-primary-sub outline-none"
          placeholder="기억나는 일, 먹었던 메뉴, 재밌었던 대화"
          maxLength={150}
          value={memo}
        />
        <span className="absolute right-0 -bottom-6 text-primary text-right">{length} / 150</span>
      </div>
    </div>
  );
}
