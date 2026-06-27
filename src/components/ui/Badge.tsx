import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export default function Badge({
  children,
  variant = 'default',
  size = 'sm',
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full whitespace-nowrap',
        size === 'sm' && 'px-2.5 py-0.5 text-xs',
        size === 'md' && 'px-3 py-1 text-sm',
        variant === 'default' &&
          'bg-[var(--color-surface)] text-[var(--color-text-muted)] border border-[var(--color-border)]',
        variant === 'primary' &&
          'bg-navy-800/10 text-navy-800 border border-navy-800/20 dark:bg-navy-400/10 dark:text-navy-300 dark:border-navy-400/20',
        variant === 'success' &&
          'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/30',
        variant === 'warning' &&
          'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/30',
        variant === 'outline' &&
          'bg-transparent text-[var(--color-text-muted)] border border-[var(--color-border)]',
        className
      )}
    >
      {children}
    </span>
  );
}
