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
export function IconHome({ color, size, className, ...props }: IconProps) {
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
        d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
        stroke="current"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M9 22V12H15V22"
        stroke="current"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
export function IconCalendarDays({ color, size, className, ...props }: IconProps) {
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
        d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
        stroke="current"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M16 2V6"
        stroke="current"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M8 2V6"
        stroke="current"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M3 10H21"
        stroke="current"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M8 14H8.01"
        stroke="current"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M12 14H12.01"
        stroke="current"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M16 14H16.01"
        stroke="current"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M8 18H8.01"
        stroke="current"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M12 18H12.01"
        stroke="current"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M16 18H16.01"
        stroke="current"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
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
export function IconChevronLeft({ color, size, className, ...props }: IconProps) {
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
        d="M15 18L9 12L15 6"
        stroke="current"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
