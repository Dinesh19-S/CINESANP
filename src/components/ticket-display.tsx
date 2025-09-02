'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Ticket, Clapperboard, Calendar, Clock, Armchair } from 'lucide-react';

export default function TicketDisplay() {
  const searchParams = useSearchParams();
  const [seats, setSeats] = useState<string[]>([]);
  const [total, setTotal] = useState<string | null>(null);

  useEffect(() => {
    setSeats(searchParams.get('seats')?.split(',') || []);
    setTotal(searchParams.get('total'));
  }, [searchParams]);

  // For the purpose of this mock, we'll use a static movie title.
  // In a real app, you'd pass the movie ID and fetch its details.
  const movieTitle = 'Cosmic Odyssey';

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <Card className="bg-gradient-to-br from-primary/10 via-background to-background border-2 border-primary/20 shadow-lg shadow-primary/10">
          <CardHeader className="text-center">
            <div className="flex justify-center items-center gap-2 mb-2">
              <Clapperboard className="w-8 h-8 text-primary" />
              <span className="font-headline text-2xl font-bold">CineSnap</span>
            </div>
            <CardTitle className="font-headline text-3xl tracking-tight">{movieTitle}</CardTitle>
            <CardDescription>Your E-Ticket</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-x-8 gap-y-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground flex items-center gap-2"><Calendar className="w-4 h-4"/> Date</p>
              <p className="font-semibold">July 28, 2024</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground flex items-center gap-2"><Clock className="w-4 h-4" /> Time</p>
              <p className="font-semibold">7:30 PM</p>
            </div>
             <div className="col-span-2 space-y-1">
              <p className="text-sm text-muted-foreground flex items-center gap-2"><Armchair className="w-4 h-4" /> Seats</p>
              <div className="flex flex-wrap gap-2">
                 {seats.map(seat => <span key={seat} className="bg-primary/20 text-primary font-mono py-1 px-2 rounded-md text-sm">{seat}</span>)}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Screen</p>
              <p className="font-semibold">3</p>
            </div>
             <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Paid</p>
              <p className="font-semibold font-headline text-lg">₹{total}</p>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-4 items-center">
             <div className="w-full flex items-center gap-2">
                <Separator className="shrink" />
                <Ticket className="w-6 h-6 text-muted-foreground/50 shrink-0" />
                <Separator className="shrink" />
             </div>
             <div className="w-48 h-12 bg-muted flex items-center justify-center">
                <p className="font-mono text-xs tracking-widest">SCAN ME</p>
             </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
