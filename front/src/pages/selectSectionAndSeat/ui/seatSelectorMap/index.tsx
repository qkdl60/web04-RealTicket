import { useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { BASE_URL } from '@/api/axios.ts';

import { useReservationStore } from '@/feature/reservation/stores/reservationStore';
import { Seat } from '@/feature/reservation/ui/seat';
import { Loading } from '@/shared/components';
import { API } from '@/shared/const';
import { useSSE } from '@/shared/hooks';
import type { SeatState } from '@/shared/types/booking';
import { Section } from '@/shared/types/data';
import { cx } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

import { useReservingMutationState, useSelectSeatMutation } from '../../hooks';
import { calcSeatNameList, calcSeatState } from '../../utils';
import { StageDirection } from '../stageDirection';

const PICK_SEAT_MUTATION_KEY = ['seat'];

export const SeatSelectorMap = ({ section }: { section: Section }) => {
  const { eventId } = useParams();

  const {
    seat: { selectedSeatList },
    section: { selectedSectionIndex },
    seatCount,
    seatAction: { setSeatList },
  } = useReservationStore();
  const { requestCancelSeat, requestReserveSeat } = useSelectSeatMutation(
    PICK_SEAT_MUTATION_KEY,
    Number(eventId),
    selectedSeatList,
    setSeatList,
    selectedSectionIndex!,
  );
  const reservingSeatList = useReservingMutationState(PICK_SEAT_MUTATION_KEY);
  const { data: SSEData, isLoading } = useSSE<{ seatStatus: boolean[][] }>({
    sseURL: `${BASE_URL}${API.BOOKING.GET_SEATS_SSE(Number(eventId))}`,
  });

  const selectedSection = section;
  const { name, seats, colLen } = selectedSection;
  const seatStatusList = SSEData && SSEData.seatStatus;
  const selectedSeatStatus = seatStatusList ? seatStatusList[selectedSectionIndex!] : [];
  const canView = isLoading === false && seatStatusList && seatStatusList.length !== 0;
  const selectedSeatCount = selectedSeatList.length;

  const selectSeatHandler = useCallback(
    (seatIndex: number, seatName: string, stateState: SeatState) => {
      if (stateState === 'mine') {
        requestCancelSeat(seatIndex, seatName);
        return;
      }
      if (seatCount <= selectedSeatCount) return;
      requestReserveSeat(seatIndex, seatName);
    },
    [seatCount, selectedSeatCount, requestCancelSeat, requestReserveSeat],
  );

  const seatNameList = useMemo(() => {
    return calcSeatNameList(seats, colLen, name, Number(eventId), selectedSectionIndex!);
  }, [colLen, name, seats, eventId, selectedSectionIndex]);

  return (
    <>
      <StageDirection />
      <div
        className={twMerge(
          cx(
            'relative mx-auto grid auto-cols-min gap-4',
            selectedSection ? `grid-cols-${selectedSection.colLen}` : '',
          ),
        )}>
        {canView ? (
          seats.map((seat, seatIndex) => {
            const seatName = seatNameList[seatIndex];
            const stateState = calcSeatState(
              seat,
              seatName,
              reservingSeatList,
              seatIndex,
              selectedSectionIndex!,
              selectedSeatList,
              selectedSeatStatus,
            );

            return (
              <Seat
                key={`${seatName}${seatIndex}`}
                seatName={seatName}
                state={stateState}
                seatIndex={seatIndex}
                onClick={selectSeatHandler}
              />
            );
          })
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};
