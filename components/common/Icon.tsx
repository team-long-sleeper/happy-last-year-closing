import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

interface IconProps {
  src: string | StaticImport;
  content: string;
  size: 's' | 'm' | 'l';
  onClickFunc?: () => void;
}

export default function Icon({ src, content, size, onClickFunc }: IconProps) {
  const sizes = {
    s: 16,
    m: 24,
    l: 32,
  };

  return (
    <Image onClick={onClickFunc} src={src} alt={content} width={sizes[size]} height={sizes[size]} />
  );
}
