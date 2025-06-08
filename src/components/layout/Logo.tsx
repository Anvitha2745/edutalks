import { MessageCircleHeart } from 'lucide-react';
import Link from 'next/link';

export function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const textSizeClass = size === 'sm' ? 'text-xl' : size === 'lg' ? 'text-3xl' : 'text-2xl';
  const iconSize = size === 'sm' ? 18 : size === 'lg' ? 28 : 24;

  return (
    <Link href="/" className="flex items-center gap-2 group">
      <MessageCircleHeart className="text-primary group-hover:text-accent transition-colors duration-300" size={iconSize} />
      <span className={`font-headline font-bold ${textSizeClass} text-foreground group-hover:text-primary transition-colors duration-300`}>
        LinguaVerse
      </span>
    </Link>
  );
}
