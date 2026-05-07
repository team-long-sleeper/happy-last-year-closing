import userService from '@/app/api/user/client';
import useGetProfileQuery from '@/query/user/useGetUserProfile.query';
import { useDeleteAccountMutation } from '@/query/user/useUsers.mutation';
import Button from '@components/common/buttons/Button';
import { Modal } from '@components/common/modal/template';
import { ModalDefaultProps } from '@type/modal.types';
import { signOut } from 'next-auth/react';

export default function AccountDeleteModal({ closeModal }: ModalDefaultProps) {
  const { data: userProfile } = useGetProfileQuery();
  const { mutateAsync: deleteAccountMutate } = useDeleteAccountMutation();

  const onClickDelete = async () => {
    if (!userProfile) return;
    await deleteAccountMutate(undefined, {
      onSuccess: () => {
        signOut({ callbackUrl: '/deleted' });
      },
    });
  };

  return (
    <Modal>
      <Modal.Title onClose={closeModal}>
        {userProfile ? <span className="font-bold">{userProfile?.name} </span> : ''}계정을
        삭제하시겠습니까?
      </Modal.Title>
      <Modal.Content>
        <div className="px-4 leading-relaxed">
          계정 삭제 후 30일 동안 계정 정보와 에피소드들이 보관되고 그 이후에는 완전히 삭제됩니다.
          <br />
          30일 내에는 복구하실 수 있어요.
        </div>
      </Modal.Content>
      <Modal.Button>
        <div className="flex">
          <Button buttonType="TETIARY" onClickFunc={closeModal}>
            취소
          </Button>
          <Button onClickFunc={onClickDelete}>삭제</Button>
        </div>
      </Modal.Button>
    </Modal>
  );
}
