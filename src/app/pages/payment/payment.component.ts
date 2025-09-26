import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  
  constructor(
    private route: ActivatedRoute,
    private router: Router
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
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Navigate to tickets page with booking details
    const queryParams = {
      movie: this.movie,
      screen: this.screen,
      time: this.time,
      seats: this.seats.join(','),
      total: this.total.toFixed(2)
    };
    
    this.router.navigate(['/tickets'], { queryParams });
  }
}