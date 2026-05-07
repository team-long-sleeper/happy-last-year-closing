import useGetEpisodeQuery from '@/query/episodes/useGetEpisode.query';
import useEpisodeDataStore from '@/stores/add-/episodeDataStore';
import { BookmarkIcon } from '@assets/icons';
import { ChangeEvent, useEffect } from 'react';
import Icon from '@common/Icon';

export default function AddTitle() {
  const { title, setTitle } = useEpisodeDataStore();
  const { data: editingEpisode } = useGetEpisodeQuery();

  useEffect(() => {
    if (!editingEpisode) return;
    setTitle(editingEpisode.title);
  }, [editingEpisode]);

  const onHandleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    setTitle(target.value);
  };

  return (
    <div className="flex items-center gap-4 pl-16 pr-5 pb-2">
      <Icon icon={BookmarkIcon} />
      <input
        className="text-xl w-full placeholder:text-primary-sub outline-none text-text-default"
        placeholder="에피소드 제목"
        onChange={onHandleOnchange}
        value={title}
      />
    </div>
  );
}
