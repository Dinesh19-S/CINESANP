import { notFound } from 'next/navigation';
import Image from 'next/image';
import { allMovies } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import StarRating from '@/components/star-rating';
import { Clock, Calendar, Users, MessageSquare } from 'lucide-react';
import SeatBooking from '@/components/seat-booking';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import ReviewForm from '@/components/review-form';

export function generateStaticParams() {
  return allMovies.map(movie => ({
    id: movie.id,
  }));
}

export default function MovieDetailPage({ params }: { params: { id: string } }) {
  const movie = allMovies.find(m => m.id === params.id);

  if (!movie) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        <div className="md:col-span-1">
          <div className="sticky top-24">
            <Card className="overflow-hidden shadow-lg">
              <div className="relative aspect-[2/3] w-full">
                <Image
                  src={movie.posterUrl}
                  alt={movie.title}
                  data-ai-hint={movie.posterAiHint}
                  fill
                  className="object-cover"
                />
              </div>
            </Card>
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">
          <div className="space-y-4">
            <h1 className="font-headline text-4xl lg:text-5xl font-bold tracking-tighter">{movie.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> <span>{movie.releaseYear}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> <span>{movie.duration} min</span>
              </div>
              <StarRating rating={movie.rating} showLabel={true} />
            </div>
            <div className="flex flex-wrap gap-2">
              {movie.genres.map(genre => (
                <Badge key={genre} variant="secondary">{genre}</Badge>
              ))}
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed pt-4">
              {movie.description}
            </p>
          </div>

          <Separator />
          
          <div>
            <h2 className="font-headline text-3xl font-bold mb-6">Book Your Seats</h2>
            <SeatBooking />
          </div>

          <Separator />

          <div>
            <h2 className="font-headline text-3xl font-bold mb-6">Reviews</h2>
            <div className="space-y-6">
              {movie.reviews.length > 0 ? (
                movie.reviews.map(review => (
                  <Card key={review.id} className="bg-card/50">
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                      <Avatar>
                        <AvatarImage src={review.avatarUrl} alt={review.author} />
                        <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="w-full">
                        <div className="flex justify-between items-center">
                           <p className="font-semibold">{review.author}</p>
                           <StarRating rating={review.rating} showLabel={false} />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare className="mx-auto h-8 w-8 mb-2" />
                  <p>No reviews yet. Be the first to share your thoughts!</p>
                </div>
              )}
            </div>

            <Separator className="my-8" />
            
            <h3 className="font-headline text-2xl font-bold mb-4">Leave a Review</h3>
            <ReviewForm />

          </div>
        </div>
      </div>
    </div>
  );
}
