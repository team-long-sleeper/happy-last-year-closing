import { tagsKeys } from '@/query/key/tags';
import useGetTagsQuery from '@/query/tags/useGetTags.query';
import { useTagCreateMutation } from '@/query/tags/useTags.mutation';
import useEpisodeDataStore from '@/stores/add-/episodeDataStore';
import Tag from '@components/common/tag';
import TagList from '@components/common/tag/TagList';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';

interface TagsOptionsProps {
  searchTag: string;
  setSearchTag: (tag: string) => void;
}

export default function TagsOptiopns({ searchTag, setSearchTag }: TagsOptionsProps) {
  const { data: tags } = useGetTagsQuery();
  const { mutateAsync } = useTagCreateMutation();
  const { addTag, tags: selectedTags } = useEpisodeDataStore();
  const queryClient = useQueryClient();

  const onClickAddTag = async (label: string) => {
    await mutateAsync(
      { label },
      {
        onSuccess: (data) => {
          setSearchTag('');
          queryClient.invalidateQueries({ queryKey: tagsKeys.base });
          addTag(data);
        },
      },
    );
  };

  // 내가 가진 태그 중에 selectedLabel 제외 시킨것들
  const availableTags = useMemo(() => {
    if (!tags) return [];
    const selectedLabels = new Set(selectedTags.map((t) => t.label));
    return tags.filter((t) => !selectedLabels.has(t.label));
  }, [tags, selectedTags]);

  // 내가 가진 tag 중에 searchTag랑 같은거 없는 경우 -> 생성
  const tagAlreadyExists = useMemo(() => {
    if (!searchTag) return true;
    return tags?.filter((t) => t.label.toLowerCase() === searchTag.toLowerCase()).length;
  }, [searchTag, tags]);

  // availableTags 태그 중 검색 결과
  // -> '선택' 하는 tag option을 이걸로 렌더링
  const filteredTags = useMemo(() => {
    if (!searchTag) return availableTags;
    return availableTags.filter((t) => t.label.toLowerCase().includes(searchTag.toLowerCase()));
  }, [availableTags, searchTag]);

  if (!tags) return null;

  return (
    <div className="flex gap-2">
      {!tagAlreadyExists ? (
        <Tag
          onClick={() => {
            onClickAddTag(searchTag);
          }}
          label={`${searchTag} 생성`}
          color="#fff"
          twStyle="border border-primary"
        />
      ) : !filteredTags.length ? (
        <div className="text-sm text-gray-500">이미 선택된 태그입니다.</div>
      ) : null}
      <TagList tags={filteredTags} onClickTag={addTag} />
    </div>
  );
}
