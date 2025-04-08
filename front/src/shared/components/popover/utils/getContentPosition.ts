import { MutableRefObject } from 'react';

export const getContentPosition = (
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
