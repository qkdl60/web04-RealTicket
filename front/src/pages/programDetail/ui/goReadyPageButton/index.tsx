import Button from '@/components/common/Button.tsx';

import type { ProgramEvent } from '@/type/index.ts';
import { cx } from 'class-variance-authority';

type GoReadyPageButtonProps = {
  selectedEvent: ProgramEvent | undefined;
  goReadyPage: () => void;
};

export const GoReadyPageButton = ({ selectedEvent, goReadyPage }: GoReadyPageButtonProps) => {
  return (
    <Button size={'middle'} color={'success'} disabled={!selectedEvent} onClick={goReadyPage}>
      <span className={cx('text-label1', selectedEvent ? 'text-typo-display' : 'text-typo-disable')}>
        예매하기
      </span>
    </Button>
  );
};
