import { useRef } from 'react';

import { BASE_URL } from '@/api/axios.ts';

import useSSE from '@/hooks/useSSE.tsx';

import { API } from '@/constants/index.ts';
import { useWaitingInfoStore } from '@/stores/booking/waitingInfoStore.ts';
import { RePermissionResult } from '@/type/booking.ts';

import { calcProgressValue, calcRestCount, calcWaitingTime, formatWaitingTime } from '../utils';

export const useWaitingData = (eventId: number) => {
  const initialWaitingTimeRef = useRef<number | null>(null);
  const myOrder = useWaitingInfoStore((state) => state.userOrder);
  const { data: waitingData, isLoading: isLoadingWaitingData } = useSSE<RePermissionResult>({
    sseURL: `${BASE_URL}${API.BOOKING.GET_RE_PERMISSION(Number(eventId))}`,
  });
  const totalWaiting = waitingData?.totalWaiting ?? null;
  const throughputRate = waitingData?.throughputRate ?? null;
  const headOrder = waitingData?.headOrder ?? null;

  const restCount = calcRestCount(headOrder, myOrder);
  const waitingTime = calcWaitingTime(restCount, throughputRate);
  const waitingTimeText = formatWaitingTime(waitingTime);
  const progressValue = calcProgressValue(initialWaitingTimeRef.current, waitingTime);

  initialWaitingTimeRef.current =
    initialWaitingTimeRef.current === null && waitingTime !== null ? waitingTime : null;
  const isMyTurn = restCount !== null && restCount <= 0;

  return { isLoadingWaitingData, myOrder, waitingTimeText, progressValue, totalWaiting, isMyTurn, restCount };
};
