import { memo, useCallback, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { BASE_URL } from '@/api/axios.ts';
import { postSeat } from '@/api/booking.ts';
import type { PostSeatData } from '@/api/booking.ts';

import { StageDirection } from '@/pages/selectSectionAndSeat/ui/stageDirection/index.tsx';
import { calcSeatNameList } from '@/pages/selectSectionAndSeat/utils/calcColumnCountList.ts';

import { useReservationStore, useSeatStatusStore } from '@/feature/reservation/stores';
import { Loading } from '@/shared/components';
import { API } from '@/shared/const';
import { useSSE } from '@/shared/hooks';
import { toast } from '@/shared/libs';
import { Section } from '@/shared/types';
import { type UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { type VariantProps, cva, cx } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

type DemoSeatSelectorMapProps = {
  section: Section;
};
export const DemoSeatSelectorMap = ({ section }: DemoSeatSelectorMapProps) => {
  const sectionCache = useRef<Record<string, JSX.Element[]>>({});

  const { eventId } = useParams();
  const { mutateAsync: selectSeat } = useMutation({
    mutationFn: postSeat,
  });
  const selectedSectionIndex = useReservationStore((state) => state.section.selectedSectionIndex);

  const canView = useSeatStatusStore((state) => state.isStatusReady);
  const setIsStatusReady = useSeatStatusStore((state) => state.seatAction.setIsStatusReady);
  const setSeatStatus = useSeatStatusStore((state) => state.seatAction.setSeatStatus);
  useSSE<{ seatStatus: boolean[][] }>({
    sseURL: `${BASE_URL}${API.BOOKING.GET_SEATS_SSE(Number(eventId))}`,
    onMessage: (data) => {
      setSeatStatus(data.seatStatus);
      setIsStatusReady(true);
    },
  });
  const seatNameList = useMemo(
    () => calcSeatNameList(section.seats, section.colLen, section.name, Number(eventId), section.id),
    [eventId, section.colLen, section.id, section.name, section.seats],
  );
  console.log(sectionCache.current);
  const renderSeatSection = useMemo(() => {
    if (sectionCache.current[section.id]) {
      return sectionCache.current[section.id];
    }
    const list = section.seats.map((seat, index) => (
      <DemoSeat
        key={index}
        isEmpty={!seat}
        seatIndex={index}
        seatName={seatNameList[index]}
        eventId={Number(eventId)}
        sectionIndex={selectedSectionIndex!}
        selectSeat={selectSeat}
      />
    ));

    sectionCache.current[section.id] = list;
    return list;
  }, [section.id, section.seats, eventId, selectedSectionIndex, seatNameList, selectSeat]);

  return (
    <div className="relative flex min-h-[30vh] flex-col gap-8">
      <StageDirection />
      <div
        className={twMerge(
          cx('mx-auto grid auto-cols-min gap-4', section ? `grid-cols-${section.colLen}` : ''),
        )}>
        {canView ? renderSeatSection : <Loading className="" />}
      </div>
    </div>
  );
};

type DemoSeatProps = {
  isEmpty: boolean;
  seatIndex: number;
  seatName: string;
  eventId: number;
  sectionIndex: number;
  selectSeat: UseMutateAsyncFunction<AxiosResponse<unknown, unknown>, Error, PostSeatData, unknown>;
};
/*
isEmpty면 무조건 empty 
예매 진행 중 리스트 가져와야한다. 
*/
const DemoSeat = memo(
  ({ isEmpty, seatIndex, seatName, eventId, sectionIndex, selectSeat }: DemoSeatProps) => {
    const setSeatInfo = useSeatStatusStore((state) => state.seatAction.setSeatInfo);
    const seatState = useSeatStatusStore((state) => state.seatInfo[`${seatName}`]?.seatStatus);
    const seatStatus = useSeatStatusStore((state) => state.seatStatus[sectionIndex][seatIndex]);
    const removeSeatInfo = useSeatStatusStore((state) => state.seatAction.removeSeatInfo);
    const currentSeatStatus = calcSeatStatus(isEmpty, seatState, seatStatus);
    const onClickSeat = useCallback(async () => {
      if (isEmpty) return;
      if (currentSeatStatus === 'mine') {
        setSeatInfo(seatName, {
          seatName,
          seatIndex,
          seatStatus: 'reserving',
          sectionIndex,
        });

        selectSeat({ eventId, seatIndex, sectionIndex, expectedStatus: 'deleted' })
          .then(() => {
            toast.success('좌석이 취소되었습니다.');
            removeSeatInfo(seatName);
          })
          .catch(() => {
            toast.error('좌석 취소에 실패했습니다.\n다시 시도해주세요.');
          });
        return;
      }

      if (currentSeatStatus === 'available') {
        const maxSeatCount = useReservationStore.getState().seatCount;
        const currentSeatCount = Object.keys(useSeatStatusStore.getState().seatInfo).length;
        if (maxSeatCount <= currentSeatCount) return;

        setSeatInfo(seatName, {
          seatName,
          seatIndex,
          seatStatus: 'reserving',
          sectionIndex,
        });

        selectSeat({ eventId, seatIndex, sectionIndex, expectedStatus: 'reserved' })
          .then(() => {
            toast.success('좌석이 선택되었습니다.');
            setSeatInfo(seatName, {
              seatName,
              seatIndex,
              seatStatus: 'mine',
              sectionIndex,
            });
          })
          .catch(() => {
            toast.error('좌석 선택에 실패했습니다.\n다른 좌석을 선택해주세요.');
            removeSeatInfo(seatName);
          });
        return;
      }
      return;
    }, [
      currentSeatStatus,
      eventId,
      isEmpty,
      removeSeatInfo,
      selectSeat,
      seatIndex,
      seatName,
      sectionIndex,
      setSeatInfo,
    ]);

    return <SeatButton key={seatIndex} onClick={onClickSeat} seatName={seatName} state={currentSeatStatus} />;
  },
);

const seatVariants = cva('rounded pointer-events-none box-border h-6 w-6', {
  variants: {
    state: {
      empty: 'bg-transparent pointer-events-none',
      reserving: 'bg-warning pointer-events-none',
      mine: 'bg-success cursor-pointer',
      others: 'bg-surface-sub pointer-events-none',
      available: 'bg-primary cursor-pointer',
    },
  },
  defaultVariants: {
    state: 'empty',
  },
});

type SeatProps = VariantProps<typeof seatVariants> & {
  seatName: string;
  onClick: () => void;
};

export const SeatButton = memo(({ state, seatName, onClick }: SeatProps) => {
  const isButton = onClick !== undefined;

  return isButton ? (
    <div
      role="button"
      aria-label={seatName}
      tabIndex={state === 'available' ? 0 : -1}
      className={`h-6 w-6 ${seatVariants({ state })}`}
      onClick={onClick}
    />
  ) : (
    <div className={seatVariants({ state })} />
  );
});

const calcSeatStatus = (
  isEmpty: boolean,
  seatState: 'reserving' | 'mine' | undefined,
  seatStatus: boolean,
) => {
  if (isEmpty) return 'empty';
  if (seatState === 'reserving') return 'reserving';
  if (seatState === 'mine') return 'mine';
  if (seatStatus) return 'available';
  return 'others';
};
