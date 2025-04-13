import { memo } from 'react';

import { Seat } from '@/feature/reservation/ui/seat';
import { Separator } from '@/shared/components';

import { SEAT_STATE_INFO_LIST } from '../../const';

type SeatStateGuideSectionProps = {
  direction?: 'row' | 'column';
};
export const SeatStateGuideSection = memo(({ direction = 'row' }: SeatStateGuideSectionProps) => {
  return (
    <>
      <Separator direction="row" />
      <div className="flex justify-evenly">
        {SEAT_STATE_INFO_LIST.map(({ state, description }) => {
          return (
            <div
              className={`flex items-center gap-4 text-display1 text-typo ${direction === 'row' ? 'flex-row' : 'flex-col'}`}>
              <Seat state={state} />
              {description}
            </div>
          );
        })}
      </div>
      <Separator direction="row" />
    </>
  );
});
