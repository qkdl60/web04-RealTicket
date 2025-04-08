import { SeatStateInfo } from '@/type/booking.ts';

export const SEAT_STATE_INFO_LIST: SeatStateInfo[] = [
  {
    state: 'available',
    description: '선택 가능',
  },
  {
    state: 'mine',
    description: '선택 완료',
  },
  {
    state: 'others',
    description: '선택 불가',
  },
  {
    state: 'reserving',
    description: '선택 중',
  },
];
