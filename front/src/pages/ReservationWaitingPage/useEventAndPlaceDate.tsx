import { CustomError } from '@/api/axios.ts';
import { getEventDetail } from '@/api/event.ts';
import { getPlaceInformation } from '@/api/place.ts';

import { PlaceInformation } from '@/type/index.ts';
import { EventDetail } from '@/type/index.ts';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

export default function useEventAndPlaceDate(eventId: number) {
  const { data: event } = useSuspenseQuery<EventDetail, CustomError>({
    queryKey: ['event', eventId],
    queryFn: getEventDetail(Number(eventId)),
    staleTime: Infinity,
  });
  const { place } = event;

  const { data: placeInfo, isPending: isPlaceInfoPending } = useQuery<PlaceInformation, CustomError>({
    queryKey: [`place`, place.id],
    queryFn: getPlaceInformation(Number(place.id)),
    enabled: !!event,
    staleTime: Infinity,
  });

  return { event, placeInfo, isPlaceInfoPending };
}
