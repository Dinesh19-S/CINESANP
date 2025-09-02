'use client';

import { useState, useMemo, useEffect } from 'react';
import { Armchair } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const rows = 6;
const cols = 10;
const basePrice = 200;
const priceIncrement = (800 - 200) / (rows - 1);

const generateBookedSeats = () => {
  const seats = new Set<string>();
  const bookedCount = 15;
  const seatKeys = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      seatKeys.push(`${r}-${c}`);
    }
  }

  for (let i = 0; i < bookedCount; i++) {
    const index = (i * 37 + 13) % seatKeys.length;
    if (!seats.has(seatKeys[index])) {
      seats.add(seatKeys[index]);
    } else {
        for (let j = 1; j < seatKeys.length; j++){
            const nextIndex = (index + j) % seatKeys.length
            if (!seats.has(seatKeys[nextIndex])) {
                seats.add(seatKeys[nextIndex])
                break;
            }
        }
    }
  }
  return seats;
};

const getPriceForSeat = (row: number) => {
  return basePrice + row * priceIncrement;
};

export default function SeatBooking() {
  const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set());
  const [bookedSeats, setBookedSeats] = useState<Set<string>>(new Set());

  useEffect(() => {
    setBookedSeats(generateBookedSeats());
  }, []);

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

  const totalPrice = useMemo(() => {
    let total = 0;
    for (const seatId of selectedSeats) {
      const [rowStr] = seatId.split('-');
      const row = parseInt(rowStr, 10);
      total += getPriceForSeat(row);
    }
    return total;
  }, [selectedSeats]);

  const totalSelected = selectedSeats.size;

  return (
    <Card className="bg-card/50">
      <CardContent className="p-6 flex flex-col items-center gap-6">
        <div className="w-full max-w-md">
           <div className="h-1 w-full bg-muted-foreground rounded-full mb-2 opacity-50" />
           <div className="h-4 w-full bg-muted-foreground rounded-b-xl mb-1 text-center text-xs font-bold text-background flex items-center justify-center">SCREEN</div>
        </div>

        <div className="w-full flex items-center gap-4">
          <span className='text-sm text-muted-foreground whitespace-nowrap'>₹{basePrice}</span>
          <div className='w-full h-2 rounded-full bg-gradient-to-r from-green-400 to-red-500' />
          <span className='text-sm text-muted-foreground whitespace-nowrap'>₹{basePrice + priceIncrement * (rows - 1)}</span>
        </div>

        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          {Array.from({ length: rows }).map((_, row) =>
            Array.from({ length: cols }).map((_, col) => {
              const seatId = `${row}-${col}`;
              const isSelected = selectedSeats.has(seatId);
              const isBooked = bookedSeats.has(seatId);
              const price = getPriceForSeat(row);
              
              let colorClass = 'text-muted-foreground/80 hover:text-primary';
              if (price < 400) {
                colorClass = 'text-green-400 hover:text-green-300';
              } else if (price >= 400 && price < 600) {
                colorClass = 'text-yellow-400 hover:text-yellow-300';
              } else {
                colorClass = 'text-red-400 hover:text-red-300';
              }

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
                        : `${colorClass} cursor-pointer`,
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
            <Armchair className="w-5 h-5 text-green-400" />
            <span>₹200-₹399</span>
          </div>
           <div className="flex items-center gap-2">
            <Armchair className="w-5 h-5 text-yellow-400" />
            <span>₹400-₹599</span>
          </div>
           <div className="flex items-center gap-2">
            <Armchair className="w-5 h-5 text-red-400" />
            <span>₹600-₹800</span>
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
            <p className="text-2xl font-bold font-headline text-primary">₹{totalPrice.toFixed(2)}</p>
          </div>
          <Button size="lg" disabled={totalSelected === 0} className="w-full sm:w-auto">
            Confirm Booking
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
