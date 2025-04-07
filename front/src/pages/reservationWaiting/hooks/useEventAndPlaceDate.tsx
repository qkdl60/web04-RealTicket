import { CustomError } from '@/api/axios.ts';
import { getEventDetail } from '@/api/event.ts';
import { getPlaceInformation } from '@/api/place.ts';

import { PlaceInformation } from '@/type/index.ts';
import { EventDetail } from '@/type/index.ts';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

//TODO api 훅 분리
export const useEventAndPlaceDate = (eventId: number) => {
  const { data: event } = useSuspenseQuery<EventDetail, CustomError>({
    queryKey: ['event', eventId],
    queryFn: getEventDetail(Number(eventId)),
    staleTime: Infinity,
  });
  const { place } = event;

  const { data: placeInfo, isPending } = useQuery<PlaceInformation, CustomError>({
    queryKey: [`place`, place.id],
    queryFn: getPlaceInformation(Number(place.id)),
    enabled: !!event,
    staleTime: Infinity,
  });
  const isLoadingPlaceInfo = isPending === true || placeInfo === undefined;
  if (isLoadingPlaceInfo) {
    return { event, placeInfo: null, isPlaceInfoPending: true };
  } else {
    return { event, placeInfo, isPlaceInfoPending: false };
  }
};
