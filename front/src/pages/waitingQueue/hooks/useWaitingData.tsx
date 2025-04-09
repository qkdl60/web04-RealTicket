import { useRef, useState } from 'react';

import { BASE_URL } from '@/api/axios.ts';

import { useWaitingInfoStore } from '@/feature/reservation/stores';
import { API } from '@/shared/const';
import { useSSE } from '@/shared/hooks';
import { RePermissionResult } from '@/shared/types/booking';

import { calcProgressValue, calcRestCount, calcWaitingTime, formatWaitingTime } from '../utils';

export const useWaitingData = (eventId: number) => {
  const initialWaitingTimeRef = useRef<number | null>(null);
  const myOrder = useWaitingInfoStore((state) => state.userOrder);
  const [waitingData, setWaitingData] = useState<RePermissionResult | null>(null);

  useSSE<RePermissionResult>({
    sseURL: `${BASE_URL}${API.BOOKING.GET_RE_PERMISSION(Number(eventId))}`,
    onMessage: (data) => {
      setWaitingData(data);
    },
  });
  const totalWaiting = waitingData?.totalWaiting ?? null;
  const throughputRate = waitingData?.throughputRate ?? null;
  const headOrder = waitingData?.headOrder ?? null;

  const restCount = calcRestCount(headOrder, myOrder);
  const waitingTime = calcWaitingTime(restCount, throughputRate);
  const waitingTimeText = formatWaitingTime(waitingTime);
  const progressValue = calcProgressValue(initialWaitingTimeRef.current, waitingTime);
  const isMyTurn = restCount !== null && restCount <= 0;
  const isLoadingWaitingData = waitingData === null;
  initialWaitingTimeRef.current =
    initialWaitingTimeRef.current === null && waitingTime !== null ? waitingTime : null;
  console.log('waitingData', waitingData);
  return { myOrder, waitingTimeText, progressValue, totalWaiting, isMyTurn, restCount, isLoadingWaitingData };
};
