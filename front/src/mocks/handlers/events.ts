import { BASE_URL } from '@/api/axios.ts';

import { mockEventInformation } from '@/mocks/data/events.ts';
import { HttpResponse, http } from 'msw';

export const eventHandlers = [
  http.get(`${BASE_URL}/event/:id`, ({ params }) => {
    const { id } = params;

    if (isNaN(Number(id))) {
      return new HttpResponse(null, { status: 400 });
    }
    return HttpResponse.json(mockEventInformation);
  }),
];
