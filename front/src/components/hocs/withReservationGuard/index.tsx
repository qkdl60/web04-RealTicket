import { PropsWithChildren, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { toast } from '@/components/Toast/index.ts';

import { RESERVATION_STEP } from '@/constants/reservation.ts';
import { useWaitingInfoStore } from '@/stores/booking/waitingInfoStore.ts';
import { useReservationStore } from '@/stores/reservation/reservationStore.ts';

export const WithReservationGuard = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const reservationStep = location.pathname.split('/').pop() ?? '';

  const { isCheckCaptcha, isCompleteReservation, isCompleteSelectSeatCount } = useReservationStore(
    (state) => state.flag,
  );
  const initReservationStore = useReservationStore((state) => state.initReservation);
  const userOder = useWaitingInfoStore((state) => state.userOrder);
  const stepGuardMap = {
    [RESERVATION_STEP.CAPTCHA]: userOder !== null,
    [RESERVATION_STEP.SELECT_COUNT]: isCheckCaptcha,
    [RESERVATION_STEP.SELECT_SECTION_SEAT]: isCompleteSelectSeatCount,
    [RESERVATION_STEP.RESULT]: isCompleteReservation,
  };

  const isValidAccess = stepGuardMap[reservationStep as keyof typeof stepGuardMap];
  useEffect(() => {
    if (!isValidAccess) {
      toast.error('잘못되 접근입니다.\n다시 시도 해주세요');
    }

    return () => {
      initReservationStore();
    };
  }, [isValidAccess, initReservationStore]);

  return isValidAccess ? children : <Navigate to="/" replace />;
};
