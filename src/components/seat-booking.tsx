'use client';

import { useState } from 'react';
import { Armchair, Screen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const rows = 6;
const cols = 10;
const pricePerSeat = 12.50;

// Generate some random booked seats for demonstration
const bookedSeats = new Set<string>();
for (let i = 0; i < 15; i++) {
  const row = Math.floor(Math.random() * rows);
  const col = Math.floor(Math.random() * cols);
  bookedSeats.add(`${row}-${col}`);
}

export default function SeatBooking() {
  const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set());

  const toggleSeat = (row: number, col: number) => {
    const seatId = `${row}-${col}`;
    if (bookedSeats.has(seatId)) return;

    const newSelectedSeats = new Set(selectedSeats);
    if (newSelectedSeats.has(seatId)) {
      newSelectedSeats.delete(seatId);
    } else {
      newSelectedSeats.add(seatId);
    }
    setSelectedSeats(newSelectedSeats);
  };

  const totalSelected = selectedSeats.size;
  const totalPrice = (totalSelected * pricePerSeat).toFixed(2);

  return (
    <Card className="bg-card/50">
      <CardContent className="p-6 flex flex-col items-center gap-6">
        <div className="w-full max-w-md">
           <div className="h-1 w-full bg-muted-foreground rounded-full mb-2 opacity-50" />
           <div className="h-4 w-full bg-muted-foreground rounded-b-xl mb-1 text-center text-xs font-bold text-background flex items-center justify-center">SCREEN</div>
        </div>

        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          {Array.from({ length: rows }).map((_, row) =>
            Array.from({ length: cols }).map((_, col) => {
              const seatId = `${row}-${col}`;
              const isSelected = selectedSeats.has(seatId);
              const isBooked = bookedSeats.has(seatId);
              return (
                <div
                  key={seatId}
                  className="relative flex justify-center items-center"
                  style={col === 2 || col === 7 ? { marginRight: '1rem' } : {}}
                >
                  <Armchair
                    onClick={() => toggleSeat(row, col)}
                    className={cn(
                      'w-6 h-6 transition-colors duration-200',
                      isBooked
                        ? 'text-muted-foreground/50 fill-muted-foreground/30 cursor-not-allowed'
                        : 'text-muted-foreground/80 hover:text-primary cursor-pointer',
                      isSelected && 'text-accent fill-accent/50'
                    )}
                  />
                </div>
              );
            })
          )}
        </div>

        <div className="flex justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Armchair className="w-5 h-5 text-muted-foreground/80" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <Armchair className="w-5 h-5 text-accent fill-accent/50" />
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <Armchair className="w-5 h-5 text-muted-foreground/50 fill-muted-foreground/30" />
            <span>Booked</span>
          </div>
        </div>

        <div className="w-full border-t border-border pt-4 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-lg">
              <span className="font-bold">{totalSelected}</span> Seats Selected
            </p>
            <p className="text-2xl font-bold font-headline text-primary">${totalPrice}</p>
          </div>
          <Button size="lg" disabled={totalSelected === 0} className="w-full sm:w-auto">
            Confirm Booking
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
