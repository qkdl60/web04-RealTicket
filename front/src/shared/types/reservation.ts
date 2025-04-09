import { SEAT_COUNT_LIST } from '@/shared/const/reservation';

export interface Reservation {
  id: number;
  programName: string;
  runningDate: string;
  placeName: string;
  seats: string;
}

export type SeatCount = (typeof SEAT_COUNT_LIST)[number];
