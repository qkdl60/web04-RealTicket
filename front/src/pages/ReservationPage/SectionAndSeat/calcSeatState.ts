import type { PostSeatData } from '@/api/booking.ts';

import type { SelectedSeat } from '@/pages/ReservationPage/SectionAndSeat';

export type SeatState = 'empty' | 'mine' | 'reserving' | 'others' | 'available';
export const calcSeatState = (
  seat: boolean,
  seatName: string,
  reservingList: PostSeatData[],
  seatIndex: number,
  selectedSectionIndex: number,
  selectedSeats: SelectedSeat[],
  selectedSeatStatus: boolean[],
): SeatState => {
  const isEmpty = !seat;
  const isMine = seatName && selectedSeats.some((selected) => selected.name == seatName);
  const isReserving = reservingList.some(
    (reserve) => reserve.seatIndex === seatIndex && reserve.sectionIndex === selectedSectionIndex,
  );
  const isOthers = !selectedSeatStatus[seatIndex];
  const seatState = (() => {
    if (isEmpty) {
      return 'empty';
    }
    if (isMine) {
      return 'mine';
    }
    if (isReserving) {
      return 'reserving';
    }
    if (isOthers) {
      return 'others';
    }
    return 'available';
  })();

  return seatState;
};
