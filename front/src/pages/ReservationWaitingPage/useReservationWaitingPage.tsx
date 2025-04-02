import { useParams } from 'react-router-dom';

import { formatEventInfo } from '@/pages/ReservationWaitingPage/formatEventInfo.ts';
import useEventAndPlaceDate from '@/pages/ReservationWaitingPage/useEventAndPlaceDate.tsx';
import useEventTimer from '@/pages/ReservationWaitingPage/useEventTimer.tsx';
import usePermission from '@/pages/ReservationWaitingPage/usePermission.tsx';

export default function useReservationWaitingPage() {
  const { eventId } = useParams();
  const { event, placeInfo, isPlaceInfoPending } = useEventAndPlaceDate(Number(eventId));
  const { permissionAndGoNextPage, isPermissionFetching } = usePermission(Number(eventId));
  const { serverTime } = useEventTimer();

  const isReadyPlaceInfo = !isPlaceInfoPending && !!placeInfo;
  const overviewImageURL = placeInfo?.layout.overview;
  const eventInfo = formatEventInfo(event);
  const reservationOpenDate = event.reservationOpenDate;
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
