import { HELP_MESSAGE_LIST } from '@/pages/selectSeatCount/const';

import { Button, Separator } from '@/shared/components';
import { SEAT_COUNT_LIST } from '@/shared/const/reservation.ts';
import { cx } from 'class-variance-authority';

import type { ViewProps } from '../../types';

export function DesktopSelectSeatCountView({
  seatCount,
  selectSeatCount,
  handleSubmit,
  isPending,
}: ViewProps) {
  return (
    <div>
      <div className="flex w-[420px] flex-col gap-8 rounded-xl border border-surface-cardBorder p-6 shadow-xl">
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-heading1">좌석 개수 선택</h2>
          <p className="text-display2 text-typo-sub">예매를 진행할 좌석의 개수를 선택해주세요.</p>
        </div>
        <Separator direction="row" />
        <label htmlFor="seatCount" className="flex flex-col gap-4">
          <span className="text-heading2">좌석 개수</span>
          <select
            id="seatCount"
            className="w-full rounded border px-4 py-2"
            defaultValue={seatCount}
            onChange={selectSeatCount}>
            {SEAT_COUNT_LIST.map((count) => (
              <option key={count} className="" value={count}>{`${count} 개`}</option>
            ))}
          </select>
        </label>
        <Separator direction="row" />
        <ul className="list-disc px-4">
          {HELP_MESSAGE_LIST.map((message) => (
            <li key={message} className="text-caption1 text-typo-sub">
              {message}
            </li>
          ))}
        </ul>
        <div className="flex gap-4">
          <Button disabled={isPending} size={'full'} color="primary" onClick={handleSubmit}>
            <span className={cx('text-typo-display', 'text-label1')}>확인</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
