import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Booking {
  id?: string;
  movieId: string;
  movieTitle: string;
  screen: number;
  showtime: string;
  seats: string[];
  totalAmount: number;
  bookingDate?: Date;
  status?: 'confirmed' | 'cancelled';
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  constructor(private apiService: ApiService) {}

  createBooking(booking: Omit<Booking, 'id' | 'bookingDate' | 'status'>): Observable<Booking> {
    return this.apiService.post<Booking>('/bookings', booking);
  }

  getMyBookings(): Observable<Booking[]> {
    return this.apiService.get<Booking[]>('/bookings/my-bookings');
  }

  getBookingById(id: string): Observable<Booking> {
    return this.apiService.get<Booking>(`/bookings/${id}`);
  }

  cancelBooking(id: string): Observable<Booking> {
    return this.apiService.patch<Booking>(`/bookings/${id}/cancel`, {});
  }
}