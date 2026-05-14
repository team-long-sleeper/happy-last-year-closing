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
import { useRouter } from 'next/navigation';
import DateTitle from './DateTitle';

export default function EpisodeList({ episodes }: EpisodeListRes) {
  const { getHandlers, position, close, isOpen, selectedEpisode } = useContextMenu();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selected, setSelected] = useState<{ id: string; title: string } | null>();
  const { push } = useRouter();

  const onDeleteEpisode = (id: string, title: string) => {
    setSelected({ id, title });
    setOpenModal(true);
    close();
  };

  const onEditEpisode = (id: string) => {
    sessionStorage.setItem('episodeListScrollY', String(window.scrollY));
    push(`/episode/write/${id}`);
  };

  return (
    <div>
      {selected && (
        <ModalLayer open={openModal} onClose={() => setOpenModal(false)}>
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
            <DateTitle date={new Date(item.date)} />

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
                  <div>
                    {item.mates.map((mate, index) => {
                      return (
                        <span key={mate.id}>
                          {mate.name}
                          {index !== item.mates.length - 1 ? `, ` : ''}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <EpisodePicture images={item.pictures} />
            {item.memo ? <div className="pt-4 text-left w-full">{item.memo}</div> : null}
          </div>
        );
      })}
    </div>
  );
}
