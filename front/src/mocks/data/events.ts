import { EventDetail } from '@/type/index.ts';

export const mockEventInformation: EventDetail = {
  id: 2,
  name: '맘마미아',
  place: {
    id: 1,
    name: '대극장',
  },
  price: 15000,
  runningTime: 10000,
  runningDate: new Date('2025-12-17T16:00:00.000Z'),
  reservationOpenDate: new Date('2024-11-15T16:00:00.000Z'),
  reservationCloseDate: new Date('2025-12-16T16:00:00.000Z'),
};
