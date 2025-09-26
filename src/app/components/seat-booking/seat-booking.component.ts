import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-seat-booking',
  templateUrl: './seat-booking.component.html',
  styleUrls: ['./seat-booking.component.scss']
})
export class SeatBookingComponent {
  @Output() confirm = new EventEmitter<{seats: string[], total: number}>();

  rows = 6;
  cols = 10;
  basePrice = 200;
  priceIncrement = (800 - 200) / (this.rows - 1);
  
  selectedSeats = new Set<string>();
  bookedSeats = new Set<string>();

  constructor() {
    this.generateBookedSeats();
  }

  private generateBookedSeats(): void {
    const bookedCount = 15;
    const seatKeys: string[] = [];
    
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        seatKeys.push(`${r}-${c}`);
      }
    }

    for (let i = 0; i < bookedCount; i++) {
      const index = (i * 37 + 13) % seatKeys.length;
      if (!this.bookedSeats.has(seatKeys[index])) {
        this.bookedSeats.add(seatKeys[index]);
      } else {
        for (let j = 1; j < seatKeys.length; j++) {
          const nextIndex = (index + j) % seatKeys.length;
          if (!this.bookedSeats.has(seatKeys[nextIndex])) {
            this.bookedSeats.add(seatKeys[nextIndex]);
            break;
          }
        }
      }
    }
  }

  getSeatRows(): number[] {
    return Array(this.rows).fill(0).map((_, i) => i);
  }

  getSeatCols(): number[] {
    return Array(this.cols).fill(0).map((_, i) => i);
  }

  toggleSeat(row: number, col: number): void {
    const seatId = `${row}-${col}`;
    if (this.bookedSeats.has(seatId)) return;

    if (this.selectedSeats.has(seatId)) {
      this.selectedSeats.delete(seatId);
    } else {
      this.selectedSeats.add(seatId);
    }
  }

  isSeatSelected(row: number, col: number): boolean {
    return this.selectedSeats.has(`${row}-${col}`);
  }

  isSeatBooked(row: number, col: number): boolean {
    return this.bookedSeats.has(`${row}-${col}`);
  }

  getPriceForSeat(row: number): number {
    return this.basePrice + row * this.priceIncrement;
  }

  getSeatClass(row: number, col: number): string {
    const seatId = `${row}-${col}`;
    const price = this.getPriceForSeat(row);
    
    if (this.bookedSeats.has(seatId)) {
      return 'seat booked';
    } else if (this.selectedSeats.has(seatId)) {
      return 'seat selected';
    } else if (price < 400) {
      return 'seat cheap';
    } else if (price >= 400 && price < 600) {
      return 'seat medium';
    } else {
      return 'seat expensive';
    }
  }

  getTotalPrice(): number {
    let total = 0;
    for (const seatId of this.selectedSeats) {
      const [rowStr] = seatId.split('-');
      const row = parseInt(rowStr, 10);
      total += this.getPriceForSeat(row);
    }
    return total;
  }

  onConfirmBooking(): void {
    this.confirm.emit({
      seats: Array.from(this.selectedSeats),
      total: this.getTotalPrice()
    });
  }
}