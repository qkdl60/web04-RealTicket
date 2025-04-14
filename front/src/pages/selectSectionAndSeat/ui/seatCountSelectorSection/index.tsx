import { memo, useState } from 'react';
import Select from 'react-select';

import { useReservationStore } from '@/feature/reservation/stores';
import { SEAT_COUNT_LIST } from '@/shared/const/reservation';
import { useConfirm } from '@/shared/hooks';

const SELECT_OPTION_LIST = SEAT_COUNT_LIST.map((count) => ({ value: count, label: `${count}매` }));
type SeatCountSelectorSectionProps = {
  changeSeatCount: (count: (typeof SEAT_COUNT_LIST)[number]) => void;
};
export const SeatCountSelectorSection = memo(({ changeSeatCount }: SeatCountSelectorSectionProps) => {
  const seatCount = useReservationStore((s) => s.seatCount);
  const { confirm } = useConfirm();
  const [isOpenSelect, setIsOpenSelect] = useState<boolean>(false);
  return (
    <label htmlFor="seatCount" className="flex flex-col gap-4">
      <span className="text-heading2">좌석 개수</span>
      <Select
        menuIsOpen={isOpenSelect}
        defaultValue={SELECT_OPTION_LIST[seatCount - 1]}
        isSearchable={false}
        options={SELECT_OPTION_LIST}
        closeMenuOnSelect={true}
        blurInputOnSelect={true}
        onChange={(event) => {
          if (event) {
            const count = event.value;
            changeSeatCount(count);
          }
        }}
        onFocus={async () => {
          if (isOpenSelect) return;
          const isConfirm = await confirm({
            title: '예매 매수 변경',
            description: `예매 매수를 변경하면 현재 선택한 좌석이 모두 취소됩니다.\n계속 진행하시겠습니까? `,
            buttons: {
              ok: {
                title: '변경하기',
                color: 'error',
              },
              cancel: {
                title: '취소',
              },
            },
          });
          if (isConfirm) {
            setIsOpenSelect(true);
          }
        }}
        onBlur={() => {
          setIsOpenSelect(false);
        }}
      />
    </label>
  );
});
