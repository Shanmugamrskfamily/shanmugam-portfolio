import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('mb-12', align === 'center' && 'text-center', className)}>
      {eyebrow && (
        <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase text-[var(--color-primary)] mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text)] leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-[var(--color-text-muted)] leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
      <div
        className={cn(
          'mt-4 h-1 w-12 rounded-full bg-[var(--color-primary)]',
          align === 'center' && 'mx-auto'
        )}
      />
    </div>
  );
}
