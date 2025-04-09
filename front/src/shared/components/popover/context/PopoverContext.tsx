import { createContext } from 'react';

import { PopoverContextValue } from '../type';

const POPOVER_CONTEXT_DEFAULT_VALUE = {
  isOpen: false,
  closePopover: () => {},
  openPopover: () => {},
  togglePopover: () => {},

  triggerRef: null,
};
export const PopoverContext = createContext<PopoverContextValue>(POPOVER_CONTEXT_DEFAULT_VALUE);
