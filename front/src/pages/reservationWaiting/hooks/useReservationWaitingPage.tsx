import { useParams } from 'react-router-dom';

import { formatEventInfo } from '@/pages/reservationWaiting/utils/formatEventInfo';

import { useEventAndPlaceDate } from './useEventAndPlaceDate';
import { useEventTimer } from './useEventTimer';
import { usePermission } from './usePermission';

export const useReservationWaitingPage = () => {
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
};
