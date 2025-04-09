import { CustomError } from '@/api/axios.ts';
import { getEventDetailAndPlaceInfo } from '@/api/event.ts';

import { PlaceInformation } from '@/shared/types/data';
import { EventDetail } from '@/shared/types/data';
import { useSuspenseQuery } from '@tanstack/react-query';

//TODO api 훅 분리
type EventAndPlaceDate = {
  event: EventDetail;
  placeInfo: PlaceInformation;
};

export const useEventAndPlaceDate = (eventId: number) => {
  const {
    data: { event, placeInfo },
  } = useSuspenseQuery<EventAndPlaceDate, CustomError>({
    queryKey: ['eventAndPlaceDate', eventId],
    queryFn: getEventDetailAndPlaceInfo(Number(eventId)),
    staleTime: Infinity,
  });

  return { event, placeInfo };
};
