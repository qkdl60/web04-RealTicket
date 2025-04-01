import { useParams } from 'react-router-dom';

import useEventAndPlaceDate from '@/pages/ReservationWaitingPage/useEventAndPlaceDate.tsx';
import useEventTimer from '@/pages/ReservationWaitingPage/useEventTimer.tsx';
import usePermission from '@/pages/ReservationWaitingPage/usePermission.tsx';

export default function useReservationWaitingPage() {
  const { eventId } = useParams();
  const { eventInfo, overviewImageURL, isReadyPlaceInfo, reservationOpenDate } = useEventAndPlaceDate(
    Number(eventId),
  );
  const { permissionAndGoNextPage, isPermissionFetching } = usePermission(Number(eventId));
  const { serverTime } = useEventTimer();

  const restTime = new Date(reservationOpenDate).getTime() - serverTime;
  const isReservationOpen = restTime <= 0;
  const canGoNextPage = isReservationOpen && !isPermissionFetching;

  return {
    isReservationOpen,
    restTime,
    eventInfo,
    canGoNextPage,
    isReadyPlaceInfo,
    overviewImageURL,
    permissionAndGoNextPage,
  };
}
