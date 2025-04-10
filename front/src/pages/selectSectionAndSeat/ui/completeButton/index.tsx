import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCompleteReservationMutation } from '@/pages/selectSectionAndSeat/hooks/useCompleteReservationMutation.tsx';

import { useReservationStore } from '@/feature/reservation/stores/reservationStore.ts';
import { Button } from '@/shared/components';
import { ROUTE_URL } from '@/shared/const/index.ts';

type CompleteButtonProps = {
  eventId: string;
};
export const CompleteButton = memo(({ eventId }: CompleteButtonProps) => {
  const navigate = useNavigate();
  const setIsCompleteReservation = useReservationStore((s) => s.flagAction.setIsCompleteReservation);
  const selectedSeatList = useReservationStore((s) => s.seat.selectedSeatList);
  const seatCount = useReservationStore((s) => s.seatCount);
  const isCompleteSelectSeat = seatCount === selectedSeatList.length;
  const completeReservation = useCompleteReservationMutation(Number(eventId));

  const goNextStep = useCallback(() => {
    setIsCompleteReservation(true);
    setTimeout(() => {
      navigate(`${ROUTE_URL.EVENT.DETAIL(Number(eventId))}/reservation/result`);
    }, 0);
  }, [navigate, eventId, setIsCompleteReservation]);
  const onComplete = useCallback(() => {
    completeReservation({
      selectedSeatList,
      onSuccess: () => {
        setIsCompleteReservation(true);
        goNextStep();
      },
    });
  }, [completeReservation, goNextStep, selectedSeatList, setIsCompleteReservation]);
  return (
    <Button disabled={!isCompleteSelectSeat} onClick={onComplete}>
      {isCompleteSelectSeat ? (
        <span className="text-label1 text-typo-display">예매하기</span>
      ) : (
        <span className="text-label1 text-typo-disable">좌석을 모두 선택해주세요</span>
      )}
    </Button>
  );
});
