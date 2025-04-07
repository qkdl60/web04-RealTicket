import { useReservationStore } from '@/stores/reservation/reservationStore.ts';

export const useSeatCount = () => {
  const {
    seatCount,
    seatCountAction: { setSeatCount },
  } = useReservationStore();

  return { seatCount, setSeatCount };
};
