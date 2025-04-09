import { MutableRefObject, ReactElement } from 'react';

import { usePopoverContext } from '../hooks';

type TriggerProps = {
  render: (togglePopover: () => void, ref: MutableRefObject<HTMLButtonElement>) => ReactElement;
  onBeforeOpen?: () => Promise<boolean>;
};
export const Trigger = ({ render, onBeforeOpen }: TriggerProps) => {
  const { togglePopover, triggerRef } = usePopoverContext();

  const handleClick = async () => {
    if (onBeforeOpen) {
      const shouldOpen = await onBeforeOpen();
      if (shouldOpen) {
        togglePopover();
      }
    } else {
      togglePopover();
    }
  };

  return <>{render(handleClick, triggerRef as MutableRefObject<HTMLButtonElement>)}</>;
};
