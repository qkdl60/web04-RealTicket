import { PropsWithChildren } from 'react';

export const Card = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex w-[420px] flex-col gap-8 rounded-xl border border-surface-cardBorder p-8 shadow-xl">
      {children}
    </div>
  );
};
