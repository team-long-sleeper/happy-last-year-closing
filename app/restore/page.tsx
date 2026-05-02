'use client';

import Button from '@components/common/buttons/Button';
import { signOut, useSession } from 'next-auth/react';
import authService from '../api/auth/client';
import { useRouter } from 'next/navigation';
import { differenceInDays } from 'date-fns';
import { formatSingleDate } from '@components/common/DateInput';
import DotsLoader from '@components/common/loading/DotsLoader';
import ModalLayer from '@components/common/modal';
import { useState } from 'react';
import ExpungeModal from '@components/restore/expungeModal';
import { toast } from '@/toast';

export default function RestorePage() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { data: session, update: updateSession } = useSession();
  const { push } = useRouter();

  const onClickRestore = async () => {
    try {
      await authService.restoreAccount();
      await updateSession({ user: { clearRestore: true } });
      push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const onClickExpungeAccount = () => {
    setOpenModal(true);
  };

  const expungeAccount = async () => {
    await authService.expungeAccount();
    toast('계정과 연결된 데이터가 삭제 완료되었어요.', 'SUCCESS');
    await signOut();
  };

  if (!session) return push('/login');

  const { status, gracePeriodEndsAt, deletedAt } = session.user;

  if (status === 'ACCOUNT_DELETION_PENDING' && deletedAt && gracePeriodEndsAt) {
    const deletedDate: string = formatSingleDate(new Date(deletedAt), 'display');
    const removeDay: string = formatSingleDate(new Date(gracePeriodEndsAt), 'display');
    const dDay: number = differenceInDays(new Date(gracePeriodEndsAt), new Date());
    const user = session?.user.name;

    return (
      <div className="h-dvh w-full flex flex-col items-center justify-center px-6 gap-8">
        <ModalLayer open={openModal}>
          <ExpungeModal onClickDelete={expungeAccount} closeModal={() => setOpenModal(false)} />
        </ModalLayer>
        <div className="text-center leading-relaxed">
          <p className="text-lg font-bold mb-4">탈퇴한 계정입니다</p>
          <p className="text-sm text-default">
            안녕하세요, {user}님!
            <br />
            {deletedDate}에 탈퇴한 계정으로 로그인하셨어요.
            <br />
            <br />
            {removeDay}
            {`(${dDay}일 후)`}
            에 보관된 계정 정보와 <br />
            에피소드들이 완전히 삭제될 예정입니다.
            <br />
            <br />
            계정을 복구하시겠어요?
          </p>
        </div>
        <div className="flex flex-col gap-2 w-75">
          <Button onClickFunc={onClickRestore}>계정 복구하기</Button>
          <Button buttonType="TETIARY" onClickFunc={onClickExpungeAccount}>
            지금 데이터 삭제하기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-dvh w-full flex flex-col items-center justify-center">
      <DotsLoader />
    </div>
  );
}
