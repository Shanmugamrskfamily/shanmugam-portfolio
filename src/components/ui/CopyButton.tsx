'use client';

import { usePageUI } from '@/components/site/PageShell';

export default function CopyButton({
  text,
  what,
  className,
}: {
  text: string;
  what: string;
  className?: string;
}) {
  const { toast } = usePageUI();
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast(`${what} copied`);
    } catch {
      toast(`Couldn't copy. ${what}: ${text}`);
    }
  };
  return (
    <button
      type="button"
      className={className}
      onClick={copy}
      aria-label={`Copy ${what.toLowerCase()}`}
    >
      Copy
    </button>
  );
}
