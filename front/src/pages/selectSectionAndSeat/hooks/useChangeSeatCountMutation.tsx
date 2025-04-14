import { useState } from 'react';
import { useCallback } from 'react';

import { postSeatCount } from '@/api/booking.ts';

import { useReservationStore, useSeatStatusStore } from '@/feature/reservation/stores';
import { toast } from '@/shared/libs';
import { SeatCount } from '@/shared/types/reservation';
import { useMutation } from '@tanstack/react-query';

export const useChangeSeatCountMutation = () => {
  //SeatStatus에 대해새 init 처리가 필요
  const initSeatList = useSeatStatusStore((s) => s.seatAction.initSeatInfo);
  const setSeatCount = useReservationStore((s) => s.seatCountAction.setSeatCount);
  const [isChangingSeatCount, setIsChangingSeatCount] = useState<boolean>(false);
  const { mutateAsync: postSeatCountMutate } = useMutation({
    mutationFn: postSeatCount,
  });
  const changeSeatCount = useCallback(
    async (count: SeatCount) => {
      setIsChangingSeatCount(true);
      toast.warning('예매 매수 변경 중입니다.\n잠시만 기다려 주세요.');

      try {
        await postSeatCountMutate(count);
        initSeatList();
        setSeatCount(count);
      } finally {
        setIsChangingSeatCount(false);
      }
    },
    [setSeatCount, postSeatCountMutate, initSeatList],
  );

  return { changeSeatCount, isChangingSeatCount };
};
