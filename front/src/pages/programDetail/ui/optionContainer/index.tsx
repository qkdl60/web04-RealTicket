import type { PropsWithChildren } from 'react';

import { Separator } from '@/shared/components';

type DateMenuProps = {
  title: string;
  caption: string;
} & PropsWithChildren;

export const OptionContainer = ({ title, caption, children }: DateMenuProps) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full flex-shrink flex-col px-4 py-2">
        <span className="text-heading3 text-typo">{title}</span>
        <span className="text-caption2 text-typo-sub">{caption}</span>
      </div>
      <Separator direction="row" />
      <ol className="option_list flex flex-grow flex-col gap-2">{children}</ol>
    </div>
  );
};
