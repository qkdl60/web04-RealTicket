import { Icon } from '@/shared/components/icon';
import { cx } from 'class-variance-authority';

interface LoadingProps {
  className?: string;
}
export const Loading = ({ className }: LoadingProps) => {
  return (
    <div className={cx('absolute left-0 top-0 flex h-full w-full items-center justify-center', className)}>
      <div className="flex flex-col items-center gap-4">
        <Icon iconName="Loading" className="h-16 w-16 animate-spin" color={'primary'} />
        <span className="text-heading3 text-typo">loading..</span>
      </div>
    </div>
  );
};
