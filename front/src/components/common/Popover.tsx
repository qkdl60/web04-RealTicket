import {
  MouseEvent,
  MutableRefObject,
  ReactElement,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

interface IPopoverContextValue {
  isOpen: boolean;
  closePopover: () => void;
  openPopover: () => void;
  togglePopover: () => void;

  triggerRef: null | MutableRefObject<HTMLButtonElement | null>;
}
interface IRootProps {
  children: ReactNode;
}

const POPOVER_CONTEXT_DEFAULT_VALUE = {
  isOpen: false,
  closePopover: () => {},
  openPopover: () => {},
  togglePopover: () => {},

  triggerRef: null,
};
const PopoverContext = createContext<IPopoverContextValue>(POPOVER_CONTEXT_DEFAULT_VALUE);
const usePopoverContext = () => useContext(PopoverContext);
const Root = ({ children }: IRootProps) => {
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
interface ITriggerProps {
  render: (togglePopover: () => void, ref: MutableRefObject<HTMLButtonElement>) => ReactElement;
  onBeforeOpen?: () => Promise<boolean>;
}
const Trigger = ({ render, onBeforeOpen }: ITriggerProps) => {
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
interface IOverlayProps {
  children: ReactNode;
}
const Overlay = ({ children }: IOverlayProps) => {
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
interface IContent {
  children: ReactNode;
}
const Content = ({ children }: IContent) => {
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

const Popover = { Root, Overlay, Trigger, Content };
export default Popover;

const getContentPosition = (
  top: number,
  left: number,
  width: number,
  height: number,
  contentRef: MutableRefObject<HTMLDivElement | null>,
  gap: number = 0,
) => {
  const { width: contentWidth, height: contentHeight } = contentRef.current?.getBoundingClientRect() || {
    width: 0,
    height: 0,
  };

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  let contentX = left + width - contentWidth;
  let contentY = top + height + gap;

  if (contentX + contentWidth > viewportWidth) {
    contentX = left;
  }

  if (contentY + contentHeight > viewportHeight) {
    contentY = top - contentHeight - gap;
  }

  return { contentX, contentY };
};
