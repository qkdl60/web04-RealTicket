import { ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { postSeatCount } from '@/api/booking.ts';

import { DesktopSelectSeatCountView, MobileSelectSeatCountView } from '@/pages/selectSeatCount/ui';

import { useReservationStore } from '@/feature/reservation/stores/reservationStore';
import { ResponsiveView } from '@/shared/components';
import { ROUTE_URL } from '@/shared/const';
import { RESERVATION_STEP } from '@/shared/const/reservation';
import type { SeatCount } from '@/shared/types/reservation';
import { useMutation } from '@tanstack/react-query';

export const SelectSeatCountPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const {
    seatCount,
    seatCountAction: { setSeatCount },
  } = useReservationStore();
  const setIsCompleteSelectSeatCount = useReservationStore(
    (state) => state.flagAction.setIsCompleteSelectSeatCount,
  );

  const { mutate: postSeatCountMutate, isPending } = useMutation({ mutationFn: postSeatCount });
  const selectSeatCount = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedCount = Number(event.target.value);
    if (selectedCount == seatCount) return;
    setSeatCount(selectedCount as SeatCount);
  };
  const goNextStep = () => {
    setIsCompleteSelectSeatCount(true);
    navigate(`${ROUTE_URL.EVENT.DEFAULT}/${eventId}/reservation/${RESERVATION_STEP.SELECT_SECTION_SEAT}`);
  };
  //TODO 로딩 표시 필요
  const handleSubmit = async () => {
    await postSeatCountMutate(seatCount);
    goNextStep();
  };

  return (
    <ResponsiveView
      desktop={
        <DesktopSelectSeatCountView
          seatCount={seatCount}
          selectSeatCount={selectSeatCount}
          handleSubmit={handleSubmit}
          isPending={isPending}
        />
      }
      mobile={
        <MobileSelectSeatCountView
          seatCount={seatCount}
          selectSeatCount={selectSeatCount}
          handleSubmit={handleSubmit}
          isPending={isPending}
        />
      }
    />
  );
};
