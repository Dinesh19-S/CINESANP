import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Movie, Showtime } from '../../models/movie.model';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  movie: Movie | null = null;
  selectedShowtime: Showtime | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.loadMovie(movieId);
    }
  }

  loadMovie(id: string): void {
    this.movieService.getMovieById(id).subscribe({
      next: (movie) => {
        this.movie = movie || null;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading movie:', error);
        this.loading = false;
      }
    });
  }

  selectShowtime(showtime: Showtime): void {
    this.selectedShowtime = showtime;
  }

  onBookingConfirm(booking: {seats: string[], total: number}): void {
    if (!this.selectedShowtime || !this.movie) return;

    const queryParams = {
      movie: this.movie.title,
      screen: this.selectedShowtime.screen.toString(),
      time: this.selectedShowtime.time,
      seats: booking.seats.join(','),
      total: booking.total.toFixed(2)
    };

    this.router.navigate(['/payment'], { queryParams });
  }
}