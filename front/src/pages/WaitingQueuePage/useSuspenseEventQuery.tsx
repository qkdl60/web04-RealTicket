import { getEventDetail } from '@/api/event.ts';

import { EventDetail } from '@/type/index.ts';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function useSuspenseEventQuery(eventId: number) {
  const { data: event } = useSuspenseQuery<EventDetail>({
    queryKey: ['event', eventId],
    queryFn: getEventDetail(eventId),
    staleTime: Infinity,
  });

  return { ...event };
}
