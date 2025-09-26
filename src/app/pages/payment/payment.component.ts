import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  movie = '';
  screen = '';
  time = '';
  seats: string[] = [];
  total = 0;
  processing = false;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.movie = params['movie'] || '';
      this.screen = params['screen'] || '';
      this.time = params['time'] || '';
      this.seats = params['seats'] ? params['seats'].split(',') : [];
      this.total = parseFloat(params['total']) || 0;
    });
  }

  async processPayment(): Promise<void> {
    this.processing = true;
    
    try {
      // Create booking
      const booking = await this.bookingService.createBooking({
        movieId: 'temp-id', // This should come from the movie selection
        movieTitle: this.movie,
        screen: parseInt(this.screen),
        showtime: this.time,
        seats: this.seats,
        totalAmount: this.total
      }).toPromise();
      
      this.snackBar.open('Booking confirmed!', 'Close', { duration: 3000 });
      
      // Navigate to tickets page with booking details
      const queryParams = {
        movie: this.movie,
        screen: this.screen,
        time: this.time,
        seats: this.seats.join(','),
        total: this.total.toFixed(2),
        bookingId: booking?.id
      };
      
      this.router.navigate(['/tickets'], { queryParams });
    } catch (error: any) {
      this.snackBar.open('Payment failed. Please try again.', 'Close', { duration: 5000 });
    } finally {
      this.processing = false;
    }
  }
}