import { MouseEvent, ReactNode, useRef } from 'react';

import { usePopoverContext } from '@/shared/components/popover/hooks';

type OverlayProps = {
  children: ReactNode;
};
export const Overlay = ({ children }: OverlayProps) => {
  const { isOpen, closePopover } = usePopoverContext();
  const overlayRef = useRef(null);
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const isOverlay = overlayRef && overlayRef.current;
    const isEqual = isOverlay && target === overlayRef.current;
    if (isEqual) {
      closePopover();
    }
  };
  return (
    <>
      {isOpen && (
        <div ref={overlayRef} className="fixed left-0 top-0 h-full w-full" onClick={handleClick}>
          {children}
        </div>
      )}
    </>
  );
};
