import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import { usePopoverContext } from '../../popover/hooks';

type ContentProps = {
  children: ReactNode;
  position?: 'left' | 'right' | 'bottom';
  widthSize?: string;
  heightSize?: string;
  isOverlay?: boolean;
  renderCloseButton: (onClose: () => void) => ReactNode;
  className?: string;
};
/*
isOpen true시 보여주고, 애니메이션 처링
isOpen false시 애니메이션 처리, 사라지기
isOpen은 모든 동작의 트리거 역할을 한다.


*/

export function Content({
  children,
  position = 'left',
  renderCloseButton,
  isOverlay = false,
  className,
}: ContentProps) {
  const { isOpen, closePopover } = usePopoverContext();
  const [isRender, setIsRender] = useState(false);
  const [isReady, setIsReady] = useState(false);

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
  const translateClass = {
    left: isReady ? 'translate-x-0' : '-translate-x-full',
    right: isReady ? 'translate-x-0' : 'translate-x-full',
    bottom: isReady ? 'translate-y-0' : 'translate-y-full',
  }[position];

  const positionClass = {
    left: 'left-0 top-0',
    right: 'right-0 top-0',
    bottom: 'bottom-0 left-0',
  }[position];
  return (
    isRender &&
    createPortal(
      <>
        {isOverlay && <div onClick={closePopover} className="fixed right-0 top-0 z-10 h-full w-full"></div>}
        <div
          className={twMerge(
            clsx(
              'fixed z-20 transform-gpu bg-white p-4 pt-[64px] transition-all duration-300',
              positionClass,
              translateClass,
              className,
            ),
          )}
          onTransitionEnd={handleTransitionEnd}>
          {renderCloseButton(closePopover)}
          {children}
        </div>
      </>,
      document.body,
    )
  );
}
