import { memo, useId, useMemo } from 'react';
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
import { useShallow } from 'zustand/shallow';

type DemoSeatSelectorMapProps = {
  section: Section;
};
export const DemoSeatSelectorMap = ({ section }: DemoSeatSelectorMapProps) => {
  const { eventId } = useParams();

  const { mutateAsync: selectSeat } = useMutation({
    mutationFn: postSeat,
  });
  const selectedSectionIndex = useReservationStore((state) => state.section.selectedSectionIndex);
  const canView = useSeatStatusStore((state) => state.isStatusReady);
  const setIsStatusReady = useSeatStatusStore((state) => state.seatAction.setIsStatusReady);
  const setSeatStatus = useSeatStatusStore((state) => state.seatAction.setSeatStatus);
  const componentId = useId();
  useSSE<{ seatStatus: boolean[][] }>({
    sseURL: `${BASE_URL}${API.BOOKING.GET_SEATS_SSE(Number(eventId))}`,
    componentId,
    onMessage: (data) => {
      setSeatStatus(data.seatStatus);
      setIsStatusReady(true);
    },
  });
  const seatNameList = useMemo(
    () => calcSeatNameList(section.seats, section.colLen, section.name, Number(eventId), section.id),
    [eventId, section.colLen, section.id, section.name, section.seats],
  );

  return (
    <div className="relative flex min-h-[30vh] flex-col gap-8">
      <StageDirection />
      <div className="relative h-[600px] overflow-auto pr-8">
        {canView ? (
          section.seats.map((seat, index) => (
            <DemoSeat
              isEmpty={!seat}
              seatName={seatNameList[index]}
              seatIndex={index}
              eventId={Number(eventId)}
              sectionIndex={selectedSectionIndex!}
              x={calcSeatPosition(index, section.colLen).x}
              y={calcSeatPosition(index, section.colLen).y}
              selectSeat={selectSeat}
            />
          ))
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

type DemoSeatProps = {
  className?: string;
  isEmpty: boolean;
  seatIndex: number;
  seatName: string;
  eventId: number;
  sectionIndex: number;
  x: number;
  y: number;
  selectSeat: UseMutateAsyncFunction<AxiosResponse<unknown, unknown>, Error, PostSeatData, unknown>;
};

const DemoSeat = memo(
  ({ isEmpty, seatIndex, seatName, eventId, sectionIndex, selectSeat, className, x, y }: DemoSeatProps) => {
    const { seatState, seatStatus } = useSeatStatusStore(
      useShallow((s) => ({
        seatState: s.seatInfo[seatName]?.seatStatus,
        seatStatus: s.seatStatus[sectionIndex][seatIndex],
      })),
    );

    const currentSeatStatus = calcSeatStatus(isEmpty, seatState, seatStatus);

    const onClickSeat = () => {
      handleSeatClick({
        isEmpty,
        isMine: seatState === 'mine',
        isAvailable: seatStatus,
        seatName,
        seatIndex,
        sectionIndex,
        eventId,
        selectSeat,
      });
    };

    return isEmpty ? (
      <EmptySeat x={x} y={y} />
    ) : (
      <SeatButton
        key={seatIndex}
        onClick={onClickSeat}
        seatName={seatName}
        state={currentSeatStatus}
        className={className}
        x={x}
        y={y}
      />
    );
  },
);

const seatVariants = cva('box-border  h-6 w-6 absolute will-change-[background-color, transform]', {
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
  x: number;
  y: number;
  onClick?: () => void;
  className?: string;
};
const EmptySeat = memo(({ x, y }: { x: number; y: number }) => {
  return (
    <div
      className="will-change-[background-color, transform] pointer-events-none absolute h-6 w-6 bg-transparent"
      style={{ transform: `translateX(${x}px) translateY(${y}px)` }}
    />
  );
});

export const SeatButton = memo(({ state, seatName, onClick, x, y }: SeatProps) => {
  const isButton = onClick !== undefined;

  return isButton ? (
    <div
      role="button"
      aria-label={seatName}
      tabIndex={state === 'available' ? 0 : -1}
      className={twMerge(cx(seatVariants({ state })))}
      onClick={onClick}
      style={{ transform: `translateX(${x}px) translateY(${y}px)` }}
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

export const handleSeatClick = async ({
  isEmpty,
  isMine,
  isAvailable,
  seatName,
  seatIndex,
  sectionIndex,
  eventId,
  selectSeat,
}: {
  isEmpty: boolean;
  isMine: boolean;
  isAvailable: boolean;
  seatName: string;
  seatIndex: number;
  sectionIndex: number;
  eventId: number;
  selectSeat: UseMutateAsyncFunction<AxiosResponse<unknown, unknown>, Error, PostSeatData, unknown>;
}) => {
  const { setSeatInfo, removeSeatInfo } = useSeatStatusStore.getState().seatAction;
  if (isEmpty) return;
  if (isMine) {
    setSeatInfo(seatName, { seatName, seatIndex, seatStatus: 'reserving', sectionIndex });

    try {
      await selectSeat({ eventId, seatIndex, sectionIndex, expectedStatus: 'deleted' });
      toast.success('좌석이 취소되었습니다.');
      removeSeatInfo(seatName);
    } catch {
      toast.error('좌석 취소 실패. 다시 시도해주세요.');
    }
    return;
  }

  if (isAvailable) {
    if (getMaxSeatCount() <= getCurrentSeatCount()) return;

    setSeatInfo(seatName, { seatName, seatIndex, seatStatus: 'reserving', sectionIndex });

    try {
      await selectSeat({ eventId, seatIndex, sectionIndex, expectedStatus: 'reserved' });
      toast.success('좌석 선택되었습니다.');
      setSeatInfo(seatName, { seatName, seatIndex, seatStatus: 'mine', sectionIndex });
    } catch {
      toast.error('좌석 선택 실패. 다시 시도해주세요.');
      removeSeatInfo(seatName);
    }
  }
};
const calcSeatPosition = (index: number, colLen: number) => {
  const seatSize = 24;
  const gap = 12;

  const row = Math.floor(index / colLen);
  const col = index % colLen;

  const x = col * (seatSize + gap);
  const y = row * (seatSize + gap);

  return { x, y };
};

const getCurrentSeatCount = () => {
  return Object.keys(useSeatStatusStore.getState().seatInfo).length;
};

const getMaxSeatCount = () => {
  return useReservationStore.getState().seatCount;
};
