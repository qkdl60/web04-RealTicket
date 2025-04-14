import { SelectedSeat } from '@/shared/types/index.ts';

export type ViewProps = {
  name: string;
  runningDate: Date;
  placeName: string;
  price: number;
  reservationList: SelectedSeat[];
};
