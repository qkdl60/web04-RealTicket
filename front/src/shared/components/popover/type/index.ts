import { MutableRefObject } from 'react';

export type PopoverContextValue = {
  isOpen: boolean;
  closePopover: () => void;
  openPopover: () => void;
  togglePopover: () => void;

  triggerRef: null | MutableRefObject<HTMLButtonElement | null>;
};
