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

export function IconTrash2({ color, size, className, ...props }: IconProps) {
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
        d="M3 6H21"
        stroke="current"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M19 6V20C19 21 18 22 17 22H7C6 22 5 21 5 20V6"
        stroke="current"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M8 6V4C8 3 9 2 10 2H14C15 2 16 3 16 4V6"
        stroke="current"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M10 11V17"
        stroke="current"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M14 11V17"
        stroke="current"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
