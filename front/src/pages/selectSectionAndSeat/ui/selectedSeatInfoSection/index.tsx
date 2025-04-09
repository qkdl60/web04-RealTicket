import { Icon, Loading } from '@/shared/components';
import { padEndArray } from '@/shared/libs';
import type { SelectedSeat } from '@/shared/types/booking';
import { twMerge } from 'tailwind-merge';

type SelectedSeatInfoProps = {
  className?: string;
  selectedSeatList: SelectedSeat[];
  seatCount: number;
  isChangingSeatCount: boolean;
};
export const SelectedSeatInfo = ({
  className,
  selectedSeatList,
  seatCount,
  isChangingSeatCount,
}: SelectedSeatInfoProps) => {
  return (
    <div className={twMerge('flex flex-col gap-4', className)}>
      <h3 className="text-heading2">선택한 좌석</h3>
      <div className="relative flex flex-col gap-2">
        {isChangingSeatCount && <Loading className="h-full w-full bg-black/20" />}
        {padEndArray(selectedSeatList, seatCount, null).map((item, index) => {
          if (item == null)
            return (
              <div
                key={index}
                className="flex w-full items-center gap-2 rounded border border-surface px-4 py-2">
                <Icon iconName="Square" />
                <span className="text-display1 text-typo-sub">좌석을 선택해주세요</span>
              </div>
            );
          else
            return (
              <div
                key={index}
                className="flex w-full items-center gap-2 rounded border border-success px-4 py-2">
                <Icon iconName="CheckSquare" color="success" />
                <span className="text-display1 text-typo">{item.name}</span>
              </div>
            );
        })}
      </div>
    </div>
  );
};
