import { BASE_URL } from '@/api/axios.ts';

import { mockBigPlaceInformation, mockPlaceInformation } from '@/mocks/data/place.ts';
import { HttpResponse, http } from 'msw';

export const placeHandlers = [
  http.get(`${BASE_URL}/place/seat/:id`, async ({ params }) => {
    const { id } = params;
    if (isNaN(Number(id))) {
      return new HttpResponse(null, { status: 400 });
    }
    if (Number(id) === 1) {
      return HttpResponse.json(mockBigPlaceInformation);
    }
    return HttpResponse.json(mockPlaceInformation);
  }),
];
