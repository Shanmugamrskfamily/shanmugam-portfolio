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
        <div
          className={cn(
            'inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5',
            align === 'center' && 'justify-center'
          )}
        >
          <span className="font-display text-xs text-[var(--color-accent)] opacity-80 select-none">
            {'✦'}
          </span>
          <span className="font-display text-[10px] tracking-[0.2em] uppercase text-[var(--color-primary)]">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text)] leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base text-[var(--color-text-muted)] leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}

      {/* Animated gradient underline */}
      <div
        className={cn('mt-5 h-[3px] w-14 rounded-full', align === 'center' && 'mx-auto')}
        style={{
          background: 'var(--gradient-accent)',
          backgroundSize: '200% 100%',
          animation: 'gradient-x 3s ease infinite',
        }}
      />
    </div>
  );
}
