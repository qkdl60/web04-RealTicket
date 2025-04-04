import { memo } from 'react';

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
  onClick: () => void;
};

function Seat({ state, seatName, onClick }: SeatProps) {
  return (
    <div
      role="button"
      data-name={seatName}
      aria-label={`${state} 좌석`}
      tabIndex={state === 'available' ? 0 : -1}
      className={`h-6 w-6 ${seatVariants({ state })}`}
      onClick={onClick}
    />
  );
}
export default memo(Seat, (prevProps, nextProps) => {
  return prevProps.state === nextProps.state && prevProps.seatName === nextProps.seatName;
});
