import { CustomError } from '@/api/axios.ts';
import { getEventDetail } from '@/api/event.ts';
import { getPlaceInformation } from '@/api/place.ts';

import { formatEventInfo } from '@/pages/ReservationWaitingPage/formatEventInfo.ts';

import { PlaceInformation } from '@/type/index.ts';
import { EventDetail } from '@/type/index.ts';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

export default function useEventAndPlaceDate(eventId: number) {
  //TODO 이벤트 정보 조회, 데이터 조회 훅 분리 반복 사용시
  const { data: event } = useSuspenseQuery<EventDetail, CustomError>({
    queryKey: ['event', eventId],
    queryFn: getEventDetail(Number(eventId)),
    staleTime: Infinity,
  });
  const { place } = event;

  const { data: placeData, isPending: isPlaceInfoPending } = useQuery<PlaceInformation, CustomError>({
    queryKey: [`place`, place.id],
    queryFn: getPlaceInformation(Number(place.id)),
    enabled: !!event,
    staleTime: Infinity,
  });

  const isReadyPlaceInfo = !isPlaceInfoPending && !!placeData;
  const overviewImageURL = placeData?.layout.overview;
  const eventInfo = formatEventInfo(event, place.name);
  const reservationOpenDate = event.reservationOpenDate;
  return { eventInfo, overviewImageURL, isReadyPlaceInfo, reservationOpenDate };
}
