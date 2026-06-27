import { cn } from '@/lib/utils';
import type { AnchorHTMLAttributes } from 'react';

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <a
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 no-underline cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2',
        size === 'sm' && 'px-4 py-2 text-sm',
        size === 'md' && 'px-5 py-2.5 text-sm',
        size === 'lg' && 'px-7 py-3.5 text-base',
        variant === 'primary' && [
          'bg-[var(--color-primary)] text-white',
          'hover:bg-[var(--color-primary-hover)] hover:shadow-md',
          'active:scale-[0.98]',
        ],
        variant === 'secondary' && [
          'bg-[var(--color-surface)] text-[var(--color-text)]',
          'border border-[var(--color-border)]',
          'hover:bg-[var(--color-border)] hover:shadow-sm',
          'active:scale-[0.98]',
        ],
        variant === 'outline' && [
          'bg-transparent text-[var(--color-primary)]',
          'border-2 border-[var(--color-primary)]',
          'hover:bg-[var(--color-primary)] hover:text-white',
          'active:scale-[0.98]',
        ],
        variant === 'ghost' && [
          'bg-transparent text-[var(--color-text-muted)]',
          'hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]',
        ],
        className
      )}
      {...props}
    >
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </a>
  );
}
