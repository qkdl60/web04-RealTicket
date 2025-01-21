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
      viewBox="0 0 24 25"
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
        d="M19 21.5L12 17.5L5 21.5V5.5C5 4.96957 5.21071 4.46086 5.58579 4.08579C5.96086 3.71071 6.46957 3.5 7 3.5H17C17.5304 3.5 18.0391 3.71071 18.4142 4.08579C18.7893 4.46086 19 4.96957 19 5.5V21.5Z"
        stroke="current"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
