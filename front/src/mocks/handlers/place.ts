import { BASE_URL } from '@/api/axios.ts';

import { mockPlaceInformation } from '@/mocks/data/place.ts';
import { HttpResponse, http } from 'msw';

export const placeHandlers = [
  http.get(`${BASE_URL}/place/seat/:id`, ({ params }) => {
    const { id } = params;
    if (isNaN(Number(id))) {
      return new HttpResponse(null, { status: 400 });
    }
    return HttpResponse.json(mockPlaceInformation);
  }),
];
