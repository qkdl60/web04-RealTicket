import { useState } from 'react';
import { useCallback } from 'react';

import { postSeatCount } from '@/api/booking.ts';

import { changeSeatCountDebounce, toast } from '@/shared/libs';
import { SeatCount } from '@/shared/types/reservation';
import { useMutation } from '@tanstack/react-query';

export const useChangeSeatCountMutation = (
  setSeatCount: (count: SeatCount) => void,
  initSeatList: () => void,
) => {
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
            initSeatList();
            setSeatCount(count);
          },
          onSettled: () => {
            setIsChangingSeatCount(false);
          },
        });
      });
    },
    [setSeatCount, postSeatCountMutate, initSeatList],
  );

  return { changeSeatCount, isChangingSeatCount };
};
