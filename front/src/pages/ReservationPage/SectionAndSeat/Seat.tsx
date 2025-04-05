import { memo } from 'react';

import { SeatState } from '@/pages/ReservationPage/SectionAndSeat/getSeatState.ts';

import { type VariantProps, cva } from 'class-variance-authority';

const seatVariants = cva('rounded', {
  variants: {
    state: {
      empty: 'bg-transparent pointer-events-none',
      reserving: 'bg-warning pointer-events-none',
      mine: 'bg-success cursor-pointer',
      others: 'bg-surface-sub pointer-events-none',
      available: 'bg-primary cursor-pointer',
    },
  },
  defaultVariants: {
    state: 'empty',
  },
});

type SeatProps = VariantProps<typeof seatVariants> & {
  seatName: string;
  onClick: (seatIndex: number, seatName: string, state: SeatState) => void;
  seatIndex: number;
};

function Seat({ state, seatName, onClick, seatIndex }: SeatProps) {
  return (
    <div
      role="button"
      aria-label={seatName}
      tabIndex={state === 'available' ? 0 : -1}
      className={`h-6 w-6 ${seatVariants({ state })}`}
      onClick={() => onClick(seatIndex, seatName, state as SeatState)}
    />
  );
}
// export default Seat;
export default memo(Seat);
