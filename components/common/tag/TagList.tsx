import { TagType } from '@type/tag.type';
import Tag from '.';

interface TagListProps {
  tags: TagType[];
  onClickTag?: (() => void) | ((tag: TagType) => void);
  onClickTagDelete?: (() => void) | ((label: string) => void);
}

export default function TagList({ tags, onClickTag, onClickTagDelete }: TagListProps) {
  return (
    <div className="flex gap-2 overflow-x-scroll">
      {tags.map((tag) => (
        <Tag
          color={tag.color}
          label={tag.label}
          key={tag.label}
          onClick={onClickTag}
          onClickDelete={onClickTagDelete}
        />
      ))}
    </div>
  );
}
