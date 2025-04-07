import { postReservation } from '@/api/reservation.ts';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { SelectedSeat } from './index.tsx';

function useCompleteReservationMutation() {
  const queryClient = useQueryClient();
  const { mutate: confirmReservation } = useMutation({ mutationFn: postReservation });

  const completeReservation = ({
    eventId,
    onSuccess,
    selectedSeatList,
  }: {
    eventId: number;
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
          queryClient.refetchQueries({ queryKey: ['reservation'] });
          queryClient.invalidateQueries({ queryKey: ['event'] });
          onSuccess();
        },
      },
    );
  };

  return completeReservation;
}
export default useCompleteReservationMutation;
