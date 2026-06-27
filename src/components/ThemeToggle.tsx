'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className={cn('w-9 h-9 rounded-lg bg-[var(--color-surface)] animate-pulse', className)}
        aria-hidden
      />
    );
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
      className={cn(
        'w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200',
        'bg-[var(--color-surface)] hover:bg-[var(--color-border)]',
        'text-[var(--color-text-muted)] hover:text-[var(--color-text)]',
        'border border-[var(--color-border)] hover:border-[var(--color-text-subtle)]',
        className
      )}
    >
      {resolvedTheme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
