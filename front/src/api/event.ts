import { apiClient } from '@/api/axios.ts';
import { getPlaceInformation } from '@/api/place.ts';
import { queryClient } from '@/api/queryClient';

import { API } from '@/constants';
import { EventDetail } from '@/type/index.ts';

export const getMockEventDetail = (id: number) => () => apiClient.get(API.EVENT.GET_EVENT_DETAIL_MOCK(id));
export const getEventDetail = (id: number) => () =>
  apiClient.get<EventDetail>(API.EVENT.GET_EVENT_DETAIL(id)).then((res) => res.data);

//TODO 분리
export const getEventDetailAndPlaceInfo = (eventId: number) => async () => {
  const event = await queryClient.ensureQueryData({
    queryKey: ['event', eventId],
    queryFn: getEventDetail(eventId),
  });

  const placeId = event.place.id;
  const placeInfo = await queryClient.ensureQueryData({
    queryKey: ['place', placeId],
    queryFn: getPlaceInformation(placeId),
  });
  return { event, placeInfo };
};
