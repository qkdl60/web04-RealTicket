import { getEventDetail } from '@/api/event.ts';

import { EventDetail } from '@/shared/types/data';
import { useSuspenseQuery } from '@tanstack/react-query';

//TODO feature 이동
export const useSuspenseEventQuery = (eventId: number) => {
  const { data: event } = useSuspenseQuery<EventDetail>({
    queryKey: ['event', eventId],
    queryFn: getEventDetail(eventId),
    staleTime: Infinity,
  });

  return { ...event };
};
