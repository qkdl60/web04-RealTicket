import { postReservation } from '@/api/reservation.ts';

import type { SelectedSeat } from '@/shared/types/booking';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCompleteReservationMutation = (eventId: number) => {
  const queryClient = useQueryClient();
  const { mutate: confirmReservation } = useMutation({
    mutationFn: postReservation,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['reservation'] });
      queryClient.invalidateQueries({ queryKey: ['event'] });
    },
  });

  const completeReservation = ({
    onSuccess,
    selectedSeatList,
  }: {
    onSuccess: () => void;
    selectedSeatList: SelectedSeat[];
  }) => {
    confirmReservation(
      {
        eventId,
        seats: selectedSeatList.map((seat) => ({
          sectionIndex: seat.sectionIndex,
          seatIndex: seat.seatIndex,
        })),
      },
      {
        onSuccess: () => {
          onSuccess();
        },
      },
    );
  };

  return completeReservation;
};
