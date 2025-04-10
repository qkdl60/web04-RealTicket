import { useReservationStore } from '@/feature/reservation/stores/reservationStore.ts';
import { useSeatStatusStore } from '@/feature/reservation/stores/seatStatusStore.ts';
import { Icon } from '@/shared/components';
import { padEndArray } from '@/shared/libs';
import { twMerge } from 'tailwind-merge';

type SelectedSeatInfoProps = {
  className?: string;
};
export const SelectedSeatInfo = ({ className }: SelectedSeatInfoProps) => {
  const seatCount = useReservationStore((s) => s.seatCount);
  const selectedSeatList = Object.values(useSeatStatusStore((s) => s.seatInfo)).filter(
    (seat) => seat.seatStatus === 'mine',
  );

  return (
    <div className={twMerge('flex flex-col gap-4', className)}>
      <h3 className="text-heading2">선택한 좌석</h3>
      <div className="relative flex flex-col gap-2">
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
                <span className="text-display1 text-typo">{item.seatName}</span>
              </div>
            );
        })}
      </div>
    </div>
  );
};
