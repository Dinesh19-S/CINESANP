'use client';

import { useState } from 'react';
import { notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import { allMovies } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import StarRating from '@/components/star-rating';
import { Clock, Calendar, Users, MessageSquare, Ticket, Screen, Video } from 'lucide-react';
import SeatBooking from '@/components/seat-booking';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import ReviewForm from '@/components/review-form';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Showtime } from '@/types';

// This is now a client component, so we can't use generateStaticParams.
// We'll fetch the movie data directly in the component.

export default function MovieDetailPage({ params }: { params: { id: string } }) {
  const [selectedShowtime, setSelectedShowtime] = useState<Showtime | null>(null);
  const router = useRouter();

  const movie = allMovies.find(m => m.id === params.id);

  if (!movie) {
    notFound();
  }
  
  const handleBooking = (seats: string[], total: number) => {
    if (!selectedShowtime) return;
    const urlParams = new URLSearchParams();
    urlParams.set('movie', movie.title);
    urlParams.set('screen', selectedShowtime.screen.toString());
    urlParams.set('time', selectedShowtime.time);
    urlParams.set('seats', seats.join(','));
    urlParams.set('total', total.toFixed(2));
    router.push(`/payment?${urlParams.toString()}`);
  };

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
            <Card className="bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ticket className="w-6 h-6 text-primary" />
                  Select a Showtime
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="flex flex-wrap gap-3">
                  {movie.showtimes.map(showtime => (
                    <Button
                      key={`${showtime.screen}-${showtime.time}`}
                      variant={selectedShowtime?.time === showtime.time && selectedShowtime?.screen === showtime.screen ? 'default' : 'outline'}
                      onClick={() => setSelectedShowtime(showtime)}
                      className="flex flex-col h-auto py-2 px-4"
                    >
                      <span className="font-bold text-lg">{showtime.time}</span>
                      <span className="text-xs text-muted-foreground">Screen {showtime.screen}</span>
                    </Button>
                  ))}
                </div>

                {selectedShowtime && (
                  <div className="pt-4 animate-fade-in-up">
                    <Separator className="mb-4" />
                    <p className="text-center font-semibold text-primary mb-4">
                      Booking for Screen {selectedShowtime.screen} at {selectedShowtime.time}
                    </p>
                    <SeatBooking onConfirm={handleBooking} />
                  </div>
                )}
              </CardContent>
            </Card>
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
