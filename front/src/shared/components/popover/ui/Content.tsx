import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { usePopoverContext } from '@/shared/components/popover/hooks/usePopoverContext.tsx';

import { getContentPosition } from '../utils';

type ContentProps = {
  children: ReactNode;
};
export const Content = ({ children }: ContentProps) => {
  const { isOpen, triggerRef } = usePopoverContext();
  const contentRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 });
  const [isReady, setIsReady] = useState(false);
  const hasButtonRef = triggerRef && triggerRef.current;
  const canOpen = isOpen && hasButtonRef;

  const updatePosition = useCallback(() => {
    if (triggerRef && triggerRef.current) {
      const trigger = triggerRef.current!;
      const { height, width, left, right, top, bottom } = trigger.getBoundingClientRect();
      setPosition({ top, bottom, left, right, width, height });
      setIsReady(true);
    }
  }, [triggerRef]);

  useEffect(() => {
    setIsReady(false);
    updatePosition();
    if (isOpen) {
      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);
    }
    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, updatePosition]);

  const { contentX, contentY } = getContentPosition(
    position.top,
    position.left,
    position.width,
    position.height,
    contentRef,
    8,
  );

  return (
    <>
      {canOpen &&
        createPortal(
          <div
            ref={contentRef}
            className={`fixed z-10 cursor-default transition-opacity duration-150 ${
              isReady ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              top: contentY,
              left: contentX,
            }}>
            {children}
          </div>,
          document.body,
        )}
    </>
  );
};
