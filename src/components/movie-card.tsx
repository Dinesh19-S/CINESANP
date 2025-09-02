import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import StarRating from '@/components/star-rating';
import { cn } from '@/lib/utils';
import type { Movie } from '@/types';

interface MovieCardProps extends React.HTMLAttributes<HTMLDivElement> {
  movie: Movie;
}

export default function MovieCard({ movie, className, ...props }: MovieCardProps) {
  return (
    <Link href={`/movies/${movie.id}`} className="group block">
      <Card className={cn("overflow-hidden transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1", className)} {...props}>
        <CardContent className="p-0">
          <div className="relative aspect-[2/3] w-full">
            <Image
              src={movie.posterUrl}
              alt={movie.title}
              data-ai-hint={movie.posterAiHint}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="p-4 space-y-2">
            <h3 className="font-bold text-base truncate font-headline">{movie.title}</h3>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <p>{movie.releaseYear}</p>
              <StarRating rating={movie.rating} />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
