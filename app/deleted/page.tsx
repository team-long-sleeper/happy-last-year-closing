'use client';

import Button from '@components/common/buttons/Button';
import { useRouter } from 'next/navigation';

export default function Deleted() {
  const router = useRouter();

  return (
    <div className="h-dvh w-full flex flex-col items-center justify-center px-6 gap-8">
      <div className="text-center leading-relaxed">
        <p className="text-lg font-bold mb-4">계정이 삭제되었어요</p>
        <p className="text-sm text-default">
          30일 동안 계정 정보와 에피소드들이 보관되며,
          <br />
          그 이후에는 완전히 삭제됩니다.
          <br />
        </p>
      </div>

      <div className="w-75">
        <Button onClickFunc={() => router.push('/login')}>메인으로 이동</Button>
      </div>
    </div>
  );
}
