
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ size = 'md', isLink = true }: { size?: 'sm' | 'md' | 'lg', isLink?: boolean }) {
  const textSizeClass = size === 'sm' ? 'text-xl' : size === 'lg' ? 'text-3xl' : 'text-2xl';

  const logoContent = (
    <span
      className={cn(
        `font-headline font-bold ${textSizeClass} transition-colors duration-300`,
        isLink && "group-hover:text-primary" // Apply group-hover effect only if Logo itself is a link with a 'group' parent
      )}
    >
      <span className={cn(
        "text-primary",
        isLink && "group-hover:text-primary"
      )}>Edu</span>
      <span className={cn(
        "text-foreground",
        isLink && "group-hover:text-primary"
      )}>talks</span>
    </span>
  );

  if (!isLink) {
    // Render as a simple div if it's not meant to be a link itself
    return (
      <div className="flex items-center gap-1">
        {logoContent}
      </div>
    );
  }

  // Render as a Link (to homepage by default)
  return (
    <Link href="/" className="flex items-center gap-1 group"> {/* 'group' class for hover effects */}
      {logoContent}
    </Link>
  );
}
