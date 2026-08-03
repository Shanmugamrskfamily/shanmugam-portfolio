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
        <div className={cn('mb-4', align === 'center' && 'flex justify-center')}>
          <span
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-[var(--color-primary)]"
            style={{
              background: 'rgba(108,99,255,0.1)',
              border: '1.5px solid rgba(108,99,255,0.22)',
              boxShadow: '0 3px 0 rgba(108,99,255,0.15), inset 0 1px 0 rgba(255,255,255,0.5)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
            {eyebrow}
          </span>
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl font-display font-black text-[var(--color-text)] leading-tight">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-3 text-base text-[var(--color-text-muted)] leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}

      <div className={cn('mt-5 clay-divider w-14', align === 'center' && 'mx-auto')} />
    </div>
  );
}
