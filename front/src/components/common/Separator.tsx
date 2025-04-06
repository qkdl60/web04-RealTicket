import { cx } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

interface ISeparatorProps {
  direction: 'col' | 'row';
  className?: string;
}
export default function Separator({ className, direction }: ISeparatorProps) {
  const directionClass = direction === 'row' ? 'h-[1px] w-full' : 'w-[1px]';
  return <div className={twMerge(cx(directionClass, 'bg-surface-cardBorder'), className)}></div>;
}
