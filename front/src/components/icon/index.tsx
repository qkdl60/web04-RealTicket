/**
 * Do not edit directly, this file was auto-generated.
 */
import { VariantProps, cva, cx } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const iconVariants = cva([], {
  variants: {
    color: {
      default: ['fill-typo stroke-typo'],
      disabled: ['fill-typo-disable stroke-typo-disable'],
      display: ['fill-typo-display stroke-typo-display'],
      success: ['fill-success stroke-success'],
      primary: ['fill-primary stroke-primary'],
      error: ['fill-error stroke-error'],
      warning: ['fill-warning stroke-warning'],
    },
    size: {
      small: ['w-6 h-6'],
      big: ['w-8 h-8'],
    },
  },
  defaultVariants: { color: 'default', size: 'small' },
});

interface IconProps extends VariantProps<typeof iconVariants> {
  className?: string;
}

export function IconBookmark({ color, size, className, ...props }: IconProps) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="current"
      className={twMerge(
        cx([
          iconVariants({
            color,
            size,
          }),
          className,
        ]),
      )}
      {...props}>
      <path
        d="M19 21L12 17L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z"
        stroke="current"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
