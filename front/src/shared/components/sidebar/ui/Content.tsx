import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { Button, Icon } from '@/shared/components';
import clsx from 'clsx';

import { usePopoverContext } from '../../popover/hooks';

type ContentProps = {
  children: ReactNode;
  position?: 'left' | 'right';
  widthSize?: string;
};
/*
isOpen true시 보여주고, 애니메이션 처링
isOpen false시 애니메이션 처리, 사라지기
isOpen은 모든 동작의 트리거 역할을 한다.


*/

export function Content({ children, position = 'left', widthSize = '180px' }: ContentProps) {
  const { isOpen, closePopover } = usePopoverContext();
  const [isRender, setIsRender] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const positionClass = position === 'left' ? 'left-0' : 'right-0';

  useEffect(() => {
    if (isOpen) {
      setIsRender(true);
      setTimeout(() => {
        setIsReady(true);
      }, 0);
    } else {
      setIsReady(false); // 닫힐 때 초기화
    }
  }, [isOpen]);

  const handleTransitionEnd = () => {
    if (!isOpen) {
      setIsRender(false);
    }
  };

  return (
    isRender &&
    createPortal(
      <div
        className={clsx(
          `fixed top-0 h-full w-[${widthSize}] bg-white p-4 pt-[64px] transition-all duration-300`,
          positionClass,
          isReady ? 'translate-x-0' : 'translate-x-[100%]',
        )}
        onTransitionEnd={handleTransitionEnd}>
        <Button
          className="absolute right-[16px] top-[16px]"
          intent={'ghost'}
          onClick={closePopover}
          size={'fit'}>
          <Icon iconName={'X'} />
        </Button>
        {children}
      </div>,
      document.body,
    )
  );
}
