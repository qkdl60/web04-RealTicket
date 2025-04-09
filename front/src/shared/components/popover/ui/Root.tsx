import { ReactNode, useRef, useState } from 'react';

import { PopoverContext } from '../context';

type RootProps = {
  children: ReactNode;
};

export const Root = ({ children }: RootProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);

  const openPopover = () => {
    setIsOpen(true);
  };
  const closePopover = () => {
    setIsOpen(false);
  };
  const togglePopover = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <PopoverContext.Provider value={{ isOpen, openPopover, closePopover, togglePopover, triggerRef }}>
      {children}
    </PopoverContext.Provider>
  );
};
