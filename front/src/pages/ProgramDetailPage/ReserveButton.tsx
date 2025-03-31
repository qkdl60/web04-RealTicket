import Button from '@/components/common/Button.tsx';

import type { EventDetail } from '@/type/index.ts';
import { cx } from 'class-variance-authority';

type ReserveButtonProps = {
  selectedEvent: Pick<EventDetail, 'runningDate' | 'id'> | undefined;
  goReadyPage: () => void;
};

export default function ReserveButton({ selectedEvent, goReadyPage }: ReserveButtonProps) {
  return (
    <Button size={'middle'} color={'success'} disabled={!selectedEvent} onClick={goReadyPage}>
      <span className={cx('text-label1', selectedEvent ? 'text-typo-display' : 'text-typo-disable')}>
        예매하기
      </span>
    </Button>
  );
}
