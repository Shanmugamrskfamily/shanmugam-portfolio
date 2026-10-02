import { useId } from 'react';

/** Capability inks, in the same order as the colour key. */
const BARS = ['var(--fe)', 'var(--be)', 'var(--ops)', 'var(--seo)'];

/**
 * The SR mark: a blueprint tile with corner brackets, "S" in ink and "R" in backend teal,
 * the four capability bars, and a <FULL·STACK/> label. Every colour is a theme token,
 * so it is drafting film in light mode and blueprint in dark mode.
 * `compact` drops the grid and label, which turn to noise below about 64px.
 * Without a `label` the mark is decorative and hidden from screen readers.
 */
export default function BrandLogo({
  size,
  compact = false,
  label,
  className,
}: {
  size: number;
  compact?: boolean;
  label?: string;
  className?: string;
}) {
  // useId can contain characters that break url(#…) references
  const id = `sr${useId().replace(/[^\w-]/g, '')}`;
  const bar = compact ? { y: 290, h: 32, w: 60, gap: 10 } : { y: 286, h: 16, w: 46, gap: 8 };
  const barsX = 200 - (bar.w * 4 + bar.gap * 3) / 2;
  const bracket = compact
    ? 'M30 84V30h54M316 30h54v54M30 316v54h54M370 316v54h-54'
    : 'M36 76V36h40M324 36h40v40M36 324v40h40M364 324v40h-40';

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 400 400"
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
    >
      <defs>
        <radialGradient id={`${id}g`} cx="50%" cy="42%" r="70%">
          <stop offset="0" style={{ stopColor: 'var(--logo-in)' }} />
          <stop offset="1" style={{ stopColor: 'var(--logo-out)' }} />
        </radialGradient>
        {!compact && (
          <pattern id={`${id}p`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke="var(--logo-grid)" strokeWidth="1.5" />
          </pattern>
        )}
        <clipPath id={`${id}c`}>
          <rect width="400" height="400" rx="64" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}c)`}>
        <rect width="400" height="400" fill={`url(#${id}g)`} />
        {!compact && <rect width="400" height="400" fill={`url(#${id}p)`} />}
      </g>
      <rect
        x="1.5"
        y="1.5"
        width="397"
        height="397"
        rx="63"
        fill="none"
        stroke="var(--line)"
        strokeWidth="3"
      />
      <path
        d={bracket}
        fill="none"
        stroke="var(--draft)"
        strokeWidth={compact ? 14 : 6}
        strokeLinecap="square"
      />
      <text
        x="200"
        y={compact ? 256 : 240}
        textAnchor="middle"
        style={{
          fontFamily: 'var(--font-draw)',
          fontStretch: compact ? '108%' : '125%',
          fontWeight: 800,
          fontSize: compact ? 226 : 176,
          letterSpacing: compact ? -4 : -2,
        }}
      >
        <tspan fill="var(--ink)">S</tspan>
        <tspan fill="var(--be)">R</tspan>
      </text>
      {BARS.map((fill, i) => (
        <rect
          key={fill}
          x={barsX + i * (bar.w + bar.gap)}
          y={bar.y}
          width={bar.w}
          height={bar.h}
          fill={fill}
        />
      ))}
      {!compact && (
        <text
          x="200"
          y="352"
          textAnchor="middle"
          fill="var(--ink)"
          style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 600,
            fontSize: 22,
            letterSpacing: 3.5,
          }}
        >
          {'<FULL'}
          <tspan fill="var(--callout)">·</tspan>
          {'STACK/>'}
        </text>
      )}
    </svg>
  );
}
