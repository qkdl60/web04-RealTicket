import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { BASE_URL } from '@/api/axios.ts';

import useSSE from '@/hooks/useSSE.tsx';

import Loading from '@/components/common/Loading.tsx';

import type { SelectedSeat } from '@/pages/ReservationPage/SectionAndSeat';
import Seat from '@/pages/ReservationPage/SectionAndSeat/Seat.tsx';
import StageDirection from '@/pages/ReservationPage/SectionAndSeat/StageDirection.tsx';
import { type SeatState, getSeatState } from '@/pages/ReservationPage/SectionAndSeat/getSeatState.ts';
import useReservingSeatListState from '@/pages/ReservationPage/SectionAndSeat/useReservingMutationState';
import useSelectSeatMutation from '@/pages/ReservationPage/SectionAndSeat/useSelectSeatMutation.tsx';

import { API } from '@/constants/index.ts';
import type { Section } from '@/type/index.ts';
import { cx } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

import { calcSeatNameList } from './calcColumnCountList.ts';

interface SeatSelectorMapProps {
  selectedSection: Section;
  selectedSectionIndex: number;
  setSelectedSeatList: (seats: SelectedSeat[]) => void;
  maxSelectCount: number;
  selectedSeatList: SelectedSeat[];
}
const PICK_SEAT_MUTATION_KEY = ['seat'];

export default function SeatSelectorMap({
  selectedSection,
  selectedSectionIndex,
  setSelectedSeatList,
  maxSelectCount,
  selectedSeatList,
}: SeatSelectorMapProps) {
  const { eventId } = useParams();
  const { name, seats, colLen } = selectedSection;
  const { requestCancelSeat, requestReserveSeat } = useSelectSeatMutation(
    PICK_SEAT_MUTATION_KEY,
    Number(eventId),
    selectedSeatList,
    setSelectedSeatList,
    selectedSectionIndex,
  );
  const reservingSeatList = useReservingSeatListState(PICK_SEAT_MUTATION_KEY);
  const { data, isLoading } = useSSE<{ seatStatus: boolean[][] }>({
    sseURL: `${BASE_URL}${API.BOOKING.GET_SEATS_SSE(Number(eventId))}`,
  });

  const seatStatusList = data && data.seatStatus;
  const selectedSeatStatus = seatStatusList ? seatStatusList[selectedSectionIndex] : [];
  const canView = isLoading === false && seatStatusList && seatStatusList.length !== 0;
  const selectedCount = selectedSeatList.length;

  const getHandleClick = (seatIndex: number, seatName: string, stateState: SeatState) => () => {
    if (stateState === 'mine') {
      requestCancelSeat(seatIndex, seatName);
      return;
    }
    if (maxSelectCount <= selectedCount) return;
    requestReserveSeat(seatIndex, seatName);
  };
  const seatNameList = useMemo(() => {
    console.log('reCalc');
    return calcSeatNameList(seats, colLen, name);
  }, [colLen, name, seats]);

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
            const stateState = getSeatState(
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
                onClick={getHandleClick(seatIndex, seatName, stateState)}
              />
            );
          })
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}
