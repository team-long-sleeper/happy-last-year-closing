import { SearchIcon } from '@assets/icons';
import Icon from './Icon';

interface SearchInputProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

export default function SearchInputField({ value, placeholder, onChange }: SearchInputProps) {
  return (
    <div className="border-2 border-primary flex justify-end">
      <input
        placeholder={placeholder}
        type="search"
        className="w-full pl-3 outline-none placeholder:text-primary-sub"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className=" py-2 px-3">
        <Icon icon={SearchIcon} />
      </div>
    </div>
  );
}
