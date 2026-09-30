import Image from 'next/image';
import type { Logo } from '@/types';

/** A brand logo on a white plate, so its own colours read in both themes. */
export default function LogoPlate({
  logo,
  className,
  sizes = '120px',
}: {
  logo: Logo;
  className?: string;
  sizes?: string;
}) {
  return (
    <span className={`logo-plate ${className ?? ''}`}>
      <Image
        src={logo.src}
        alt={`${logo.alt} logo`}
        width={logo.width}
        height={logo.height}
        sizes={sizes}
        unoptimized={logo.src.endsWith('.svg')}
      />
    </span>
  );
}
