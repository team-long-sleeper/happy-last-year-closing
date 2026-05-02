'use client';

import episodeService from '@/app/api/episodes/client';
import { episodesKeys } from '@/query/key/episodes';
import Button from '@common/buttons/Button';
import { Modal } from '@common/modal/template';
import ModalButton from '@common/modal/template/ModalButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ModalDefaultProps } from '@type/modal.types';

interface DeleteCheckModalProps {
  title: string;
  id: string;
}

export default function DeleteCheckModal({
  title,
  closeModal,
  id,
}: DeleteCheckModalProps & ModalDefaultProps) {
  const queryClient = useQueryClient();
  const episodeDeleteMutation = useMutation({
    mutationFn: episodeService.deleteEpisode,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: episodesKeys.base });
    },
  });
  const onClickCancel = () => {
    closeModal();
  };

  const onClickDelete = async () => {
    closeModal();
    await episodeDeleteMutation.mutateAsync(id);
  };

  return (
    <Modal>
      <Modal.Title onClose={closeModal}>에피소드 삭제</Modal.Title>
      <Modal.Content>
        <div className="px-5 pb-10">{title} 에피소드를 삭제하시겠습니까?</div>
      </Modal.Content>
      <ModalButton twStyle="flex">
        <Button buttonType="TETIARY" onClickFunc={onClickCancel}>
          취소
        </Button>
        <Button onClickFunc={onClickDelete}>삭제</Button>
      </ModalButton>
    </Modal>
  );
}
