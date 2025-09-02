import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  showLabel?: boolean;
  className?: string;
  starClassName?: string;
}

export default function StarRating({
  rating,
  totalStars = 5,
  showLabel = true,
  className,
  starClassName,
}: StarRatingProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="flex items-center">
        {[...Array(totalStars)].map((_, index) => {
          const starValue = index + 1;
          return (
            <Star
              key={index}
              className={cn(
                'h-4 w-4',
                starValue <= rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/50',
                starClassName
              )}
            />
          );
        })}
      </div>
      {showLabel && <span className="text-xs font-medium">{rating.toFixed(1)}</span>}
    </div>
  );
}
