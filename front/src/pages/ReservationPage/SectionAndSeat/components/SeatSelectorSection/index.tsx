import { useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { BASE_URL } from '@/api/axios.ts';

import useSSE from '@/hooks/useSSE.tsx';

import Loading from '@/components/common/Loading.tsx';

import type { SelectedSeat } from '@/pages/ReservationPage/SectionAndSeat';
import { calcSeatNameList } from '@/pages/ReservationPage/SectionAndSeat/calcColumnCountList.ts';
import { type SeatState, calcSeatState } from '@/pages/ReservationPage/SectionAndSeat/calcSeatState';

import { API } from '@/constants/index.ts';
import type { Section } from '@/type/index.ts';
import { cx } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

import { Seat, StageDirection } from './components';
import { useReservingMutationState, useSelectSeatMutation } from './hooks';

interface SeatSelectorSectionProps {
  selectedSection: Section;
  selectedSectionIndex: number;
  setSelectedSeatList: (seats: SelectedSeat[]) => void;
  maxSelectCount: number;
  selectedSeatList: SelectedSeat[];
}
const PICK_SEAT_MUTATION_KEY = ['seat'];

export const SeatSelectorSection = ({
  selectedSection,
  selectedSectionIndex,
  setSelectedSeatList,
  maxSelectCount,
  selectedSeatList,
}: SeatSelectorSectionProps) => {
  const { eventId } = useParams();
  const { name, seats, colLen } = selectedSection;
  const { requestCancelSeat, requestReserveSeat } = useSelectSeatMutation(
    PICK_SEAT_MUTATION_KEY,
    Number(eventId),
    selectedSeatList,
    setSelectedSeatList,
    selectedSectionIndex,
  );

  const reservingSeatList = useReservingMutationState(PICK_SEAT_MUTATION_KEY);
  const { data, isLoading } = useSSE<{ seatStatus: boolean[][] }>({
    sseURL: `${BASE_URL}${API.BOOKING.GET_SEATS_SSE(Number(eventId))}`,
  });

  const seatStatusList = data && data.seatStatus;
  const selectedSeatStatus = seatStatusList ? seatStatusList[selectedSectionIndex] : [];
  const canView = isLoading === false && seatStatusList && seatStatusList.length !== 0;
  const selectedSeatCount = selectedSeatList.length;

  const selectSeatHandler = useCallback(
    (seatIndex: number, seatName: string, stateState: SeatState) => {
      if (stateState === 'mine') {
        requestCancelSeat(seatIndex, seatName);
        return;
      }
      if (maxSelectCount <= selectedSeatCount) return;
      requestReserveSeat(seatIndex, seatName);
    },
    [maxSelectCount, selectedSeatCount, requestCancelSeat, requestReserveSeat],
  );

  const seatNameList = useMemo(() => {
    return calcSeatNameList(seats, colLen, name, Number(eventId), selectedSectionIndex);
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
              selectedSectionIndex,
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
