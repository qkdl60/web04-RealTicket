import { useEffect } from 'react';

import { useReservationStore } from '@/stores/reservation/reservationStore.ts';

export const useSeatCount = () => {
  const {
    seatCount,
    seatCountAction: { setSeatCount, initSeatCount },
  } = useReservationStore();

  useEffect(() => {
    initSeatCount();
  }, [initSeatCount]);
  return { seatCount, setSeatCount };
};
