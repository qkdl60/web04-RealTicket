import { PostReservationData } from '@/api/reservation';

import { API } from '@/constants';
import { HttpResponse, http } from 'msw';

// Mock data
const mockReservations = [
  {
    id: 1,
    eventId: 1,
    seats: [
      { sectionIndex: 0, seatIndex: 1 },
      { sectionIndex: 0, seatIndex: 2 },
    ],
    createdAt: '2024-03-20T10:00:00Z',
    updatedAt: '2024-03-20T10:00:00Z',
  },
  {
    id: 2,
    eventId: 2,
    seats: [{ sectionIndex: 1, seatIndex: 3 }],
    createdAt: '2024-03-21T14:00:00Z',
    updatedAt: '2024-03-21T14:00:00Z',
  },
];

export const reservationHandlers = [
  // Get all reservations
  http.get(API.RESERVATION.GET_RESERVATION, () => {
    return HttpResponse.json(mockReservations);
  }),

  // Create new reservation
  http.post(API.RESERVATION.POST_RESERVATION, async ({ request }) => {
    const data = (await request.json()) as PostReservationData;
    const newReservation = {
      id: mockReservations.length + 1,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockReservations.push(newReservation);
    return HttpResponse.json(newReservation, { status: 201 });
  }),

  // Delete reservation
  http.delete(`/reservation/:id`, ({ params }) => {
    const id = Number(params.id);
    const index = mockReservations.findIndex((res) => res.id === id);

    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    mockReservations.splice(index, 1);
    return new HttpResponse(null, { status: 204 });
  }),
];
