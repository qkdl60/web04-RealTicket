import { apiClient } from '@/api/axios.ts';

import { API } from '@/constants';

export const getMockEventDetail = (id: number) => () => apiClient.get(API.EVENT.GET_EVENT_DETAIL_MOCK(id));
export const getEventDetail = (id: number) => () =>
  apiClient.get(API.EVENT.GET_EVENT_DETAIL(id)).then((res) => res.data);
