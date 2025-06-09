
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const textSizeClass = size === 'sm' ? 'text-xl' : size === 'lg' ? 'text-3xl' : 'text-2xl';

  return (
    <Link href="/" className="flex items-center gap-1 group">
      <span 
        className={cn(
          `font-headline font-bold ${textSizeClass} group-hover:text-primary transition-colors duration-300`
        )}
      >
        <span className="text-primary group-hover:text-primary">Edu</span>
        <span className="text-foreground group-hover:text-primary">talks</span>
      </span>
    </Link>
  );
}
