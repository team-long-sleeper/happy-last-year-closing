import { TagIcon } from '@assets/icons';
import Icon from '@components/common/Icon';
import { useEffect, useState } from 'react';
import TagsOptiopns from './TagsOptions';
import useEpisodeDataStore from '@/stores/episodeDataStore';
import Tag from '@components/common/tag';
import useGetEpisodeQuery from '@/query/episodes/useGetEpisode.query';

export default function AddTag() {
  const [searchTag, setSearchTag] = useState<string>('');
  const { data: editingEpisode } = useGetEpisodeQuery();
  const { tags: selectedTags, removeTag, setTags } = useEpisodeDataStore();

  useEffect(() => {
    if (!editingEpisode) return;

    setTags(editingEpisode.tags);
  }, [editingEpisode]);

  return (
    <div className="w-full flex flex-col pl-16 pb-9">
      <div className="w-full flex items-center gap-4">
        <div>
          <Icon icon={TagIcon} />
        </div>
        <div className="relative w-full pr-10 flex overflow-x-scroll gap-2">
          {selectedTags.map((tag) => (
            <Tag color={tag.color} label={tag.label} key={tag.label} onClickDelete={removeTag} />
          ))}
          <input
            placeholder={selectedTags.length > 0 ? '' : '에피소드 태그'}
            className="w-50 outline-none placeholder:text-primary-sub text-xl"
            value={searchTag}
            onChange={(e) => setSearchTag(e.target.value)}
            maxLength={10}
          />
        </div>
      </div>
      <div className="pl-10 pt-2">
        <TagsOptiopns searchTag={searchTag} setSearchTag={setSearchTag} />
      </div>
    </div>
  );
}
