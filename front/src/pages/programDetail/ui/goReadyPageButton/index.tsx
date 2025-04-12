import { Button } from '@/shared/components';
import type { ProgramEvent } from '@/shared/types/data';
import { cx } from 'class-variance-authority';

type GoReadyPageButtonProps = {
  size?: 'middle' | 'full';
  selectedEvent: ProgramEvent | undefined;
  goReadyPage: () => void;
};

export const GoReadyPageButton = ({
  selectedEvent,
  goReadyPage,
  size = 'middle',
}: GoReadyPageButtonProps) => {
  return (
    <Button size={size} color={'success'} disabled={!selectedEvent} onClick={goReadyPage}>
      <span className={cx('text-label1', selectedEvent ? 'text-typo-display' : 'text-typo-disable')}>
        예매하기
      </span>
    </Button>
  );
};
