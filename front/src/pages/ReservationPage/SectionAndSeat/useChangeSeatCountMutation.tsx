import { useState } from 'react';
import { useCallback } from 'react';

import { postSeatCount } from '@/api/booking.ts';

import { toast } from '@/components/Toast/index.ts';

import { changeSeatCountDebounce } from '@/utils/debounce.ts';

import { SeatCount } from '@/type/reservation.ts';
import { useMutation } from '@tanstack/react-query';

import type { SelectedSeat } from './index.tsx';

function useChangeSeatCountMutation(
  setSeatCount: (count: SeatCount) => void,
  setSelectedSeatList: (list: SelectedSeat[]) => void,
) {
  const [isChangingSeatCount, setIsChangingSeatCount] = useState<boolean>(false);
  const { mutate: postSeatCountMutate } = useMutation({
    mutationFn: postSeatCount,
  });
  const changeSeatCount = useCallback(
    (count: SeatCount) => {
      setIsChangingSeatCount(true);
      toast.warning('예매 매수 변경 중입니다.\n잠시만 기다려 주세요.');
      changeSeatCountDebounce(() => {
        postSeatCountMutate(count, {
          onSuccess: () => {
            setSelectedSeatList([]);
            setSeatCount(count);
          },
          onSettled: () => {
            setIsChangingSeatCount(false);
          },
        });
      });
    },
    [setSeatCount, postSeatCountMutate, setSelectedSeatList],
  );

  return { changeSeatCount, isChangingSeatCount };
}

export default useChangeSeatCountMutation;
