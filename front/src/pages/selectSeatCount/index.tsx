import { ChangeEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { postSeatCount } from '@/api/booking.ts';

import { useReservationStore } from '@/feature/reservation/stores/reservationStore';
import { Button, Separator } from '@/shared/components';
import { ROUTE_URL } from '@/shared/const';
import { RESERVATION_STEP, SEAT_COUNT_LIST } from '@/shared/const/reservation';
import type { SeatCount } from '@/shared/types/reservation';
import { useMutation } from '@tanstack/react-query';
import { cx } from 'class-variance-authority';

import { HELP_MESSAGE_LIST } from './const';

export const SelectSeatCountPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const {
    seatCount,
    seatCountAction: { setSeatCount },
  } = useReservationStore();
  const setIsCompleteSelectSeatCount = useReservationStore(
    (state) => state.flagAction.setIsCompleteSelectSeatCount,
  );

  const { mutate: postSeatCountMutate, isPending } = useMutation({ mutationFn: postSeatCount });
  const selectSeatCount = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedCount = Number(event.target.value);
    if (selectedCount == seatCount) return;
    setSeatCount(selectedCount as SeatCount);
  };
  const goNextStep = () => {
    setIsCompleteSelectSeatCount(true);
    navigate(`${ROUTE_URL.EVENT.DEFAULT}/${eventId}/reservation/${RESERVATION_STEP.SELECT_SECTION_SEAT}`);
  };
  //TODO 로딩 표시 필요
  const handleSubmit = async () => {
    await postSeatCountMutate(seatCount);
    goNextStep();
  };

  return (
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
        <Button color={'cancel'} asChild>
          <Link to="/">
            <span className="text-label1 text-typo-display">취소</span>
          </Link>
        </Button>
        <Button disabled={isPending} color="primary" onClick={handleSubmit}>
          <span className={cx('text-typo-display', 'text-label1')}>확인</span>
        </Button>
      </div>
    </div>
  );
};
