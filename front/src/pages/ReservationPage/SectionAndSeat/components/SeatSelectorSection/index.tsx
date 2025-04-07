import { useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { BASE_URL } from '@/api/axios.ts';

import useSSE from '@/hooks/useSSE.tsx';

import Loading from '@/components/common/Loading.tsx';

import { calcSeatNameList } from '@/pages/ReservationPage/SectionAndSeat/calcColumnCountList.ts';
import { type SeatState, calcSeatState } from '@/pages/ReservationPage/SectionAndSeat/calcSeatState';
import { useEventAndPlaceDate } from '@/pages/reservationWaiting/hooks/useEventAndPlaceDate.tsx';

import { API } from '@/constants/index.ts';
import { useReservationStore } from '@/stores/reservation/reservationStore.ts';
import { cx } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

import { Seat, StageDirection } from './components';
import { useReservingMutationState, useSelectSeatMutation } from './hooks';

const PICK_SEAT_MUTATION_KEY = ['seat'];

export const SeatSelectorSection = () => {
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

  const { placeInfo } = useEventAndPlaceDate(Number(eventId));
  const layout = placeInfo.layout;
  const sections = layout.sections;
  const selectedSection = sections[selectedSectionIndex!];
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
