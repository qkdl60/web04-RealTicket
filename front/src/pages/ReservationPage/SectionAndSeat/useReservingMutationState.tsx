import { PostSeatData } from '@/api/booking.ts';

import { useMutationState } from '@tanstack/react-query';

const useReservingMutationState = (mutationKey: string[]) => {
  const reservingList = useMutationState<PostSeatData>({
    filters: {
      mutationKey: mutationKey,
      status: 'pending',
      predicate: (mutation) => {
        return mutation.state.variables.expectedStatus === 'reserved';
      },
    },
    select: (mutation) => mutation.state.variables as PostSeatData,
  });
  return reservingList;
};

export default useReservingMutationState;
