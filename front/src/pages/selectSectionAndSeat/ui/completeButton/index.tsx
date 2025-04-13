import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCompleteReservationMutation } from '@/pages/selectSectionAndSeat/hooks/useCompleteReservationMutation.tsx';

import { useReservationStore } from '@/feature/reservation/stores/reservationStore.ts';
import { useSeatStatusStore } from '@/feature/reservation/stores/seatStatusStore.ts';
import { Button } from '@/shared/components';
import { ROUTE_URL } from '@/shared/const/index.ts';

type CompleteButtonProps = {
  eventId: number;
};
export const CompleteButton = memo(({ eventId }: CompleteButtonProps) => {
  const navigate = useNavigate();
  const setIsCompleteReservation = useReservationStore((s) => s.flagAction.setIsCompleteReservation);
  const setSelectedSeatList = useReservationStore((s) => s.seatAction.setSeatList);
  const selectedSeatInfoList = Object.values(useSeatStatusStore((s) => s.seatInfo)).filter(
    (value) => value.seatStatus === 'mine',
  );
  const seatCount = useReservationStore((s) => s.seatCount);
  const isCompleteSelectSeat = seatCount === selectedSeatInfoList.length;

  const completeReservation = useCompleteReservationMutation(Number(eventId));
  const selectedSeatList = selectedSeatInfoList.map((seatInfo) => ({
    name: seatInfo.seatName,
    seatIndex: seatInfo.seatIndex,
    sectionIndex: seatInfo.sectionIndex,
  }));

  const onComplete = useCallback(() => {
    completeReservation({
      selectedSeatList,
      onSuccess: () => {
        setIsCompleteReservation(true);
        setSelectedSeatList(selectedSeatList);
        setTimeout(() => {
          navigate(`${ROUTE_URL.EVENT.DETAIL(Number(eventId))}/reservation/result`);
        }, 0);
      },
    });
  }, [
    completeReservation,
    eventId,
    selectedSeatList,
    setIsCompleteReservation,
    navigate,
    setSelectedSeatList,
  ]);
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
