import { Seat } from '@/components/Seat';
import Separator from '@/components/common/Separator.tsx';

import type { SeatState } from '@/pages/ReservationPage/SectionAndSeat/calcSeatState.ts';

type SeatStateInfo = {
  state: SeatState;
  description: string;
};

const SEAT_STATE_INFO_LIST: SeatStateInfo[] = [
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

export const SeatStatusGuide = () => {
  return (
    <>
      <Separator direction="row" />
      <div className="flex justify-evenly">
        {SEAT_STATE_INFO_LIST.map(({ state, description }) => {
          return (
            <div className="flex items-center gap-4 text-display1 text-typo">
              <Seat state={state} />
              {description}
            </div>
          );
        })}
      </div>
      <Separator direction="row" />
    </>
  );
};
