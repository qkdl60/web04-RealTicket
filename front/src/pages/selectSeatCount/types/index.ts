import { ChangeEvent } from 'react';

import { SeatCount } from '@/shared/types/reservation.ts';

export type ViewProps = {
  seatCount: SeatCount;
  selectSeatCount: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleSubmit: () => Promise<void>;
  isPending: boolean;
};
