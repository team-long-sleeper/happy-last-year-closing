'use client';

import { EpisodeListRes } from '@/types/episode.types';
import { MateIcon, PlaceIcon } from '@assets/icons';
import { formatSingleDate } from '@common/DateInput';
import Icon from '@common/Icon';
import EpisodePicture from './EpisodePicture';
import { useContextMenu } from '@/hooks/useContextMenu';
import ContextMenu from '@components/common/ContextMenu';
import ModalLayer from '@components/common/modal';
import DeleteCheckModal from './DeleteCheckModal';
import { useState } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useRouter } from 'next/navigation';

export default function EpisodeList({ episodes }: EpisodeListRes) {
  const { getHandlers, position, close, isOpen, selectedEpisode } = useContextMenu();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selected, setSelected] = useState<{ id: string; title: string } | null>();
  const isMobile = useIsMobile();
  const { push } = useRouter();

  const onDeleteEpisode = (id: string, title: string) => {
    setSelected({ id, title });
    setOpenModal(true);
    close();
  };

  const onEditEpisode = (id: string) => {
    push(`/episode/write/${id}`);
  };

  return (
    <div className="w-full px-4">
      {selected && (
        <ModalLayer
          open={openModal}
          onClose={() => setOpenModal(false)}
          variant={isMobile ? 'bottomsheet' : 'modal'}
        >
          <DeleteCheckModal
            closeModal={() => setOpenModal(false)}
            title={selected.title}
            id={selected.id}
          />
        </ModalLayer>
      )}

      {isOpen && position && (
        <ContextMenu
          position={position}
          onClose={close}
          items={[
            {
              label: '삭제하기',
              onClick: () => onDeleteEpisode(selectedEpisode!.id, selectedEpisode!.title),
            },
            { label: '수정하기', onClick: () => onEditEpisode(selectedEpisode!.id) },
          ]}
        />
      )}

      {episodes.map((item, index) => {
        return (
          <div
            key={index}
            className="w-full flex flex-col items-center pt-10"
            {...getHandlers(item)}
          >
            <div className="text-2xl text-primary pb-4 w-full">
              {formatSingleDate(new Date(item.date), 'number')}
            </div>

            <div className="flex flex-col gap-1 w-full pb-2">
              <div className="text-primary">{item.title}</div>

              <div className="flex gap-3 items-center">
                <div className="flex gap-1 items-center">
                  <Icon icon={PlaceIcon} iconColor="text-default" size="s" />
                  {item.place.name}
                </div>

                <div className="border-l h-3 border-text-default/40" />

                <div className="flex items-center gap-1">
                  <Icon icon={MateIcon} size="s" iconColor="text-default" />
                  <div className="flex">
                    {item.mates.map((mate, index) => {
                      return (
                        <div key={mate.id}>
                          {mate.name}
                          {index !== item.mates.length - 1 ? ',' : ''}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <EpisodePicture images={item.pictures} />
          </div>
        );
      })}
    </div>
  );
}
