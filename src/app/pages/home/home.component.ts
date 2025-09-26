import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  searchTerm = '';
  selectedGenre = 'all';
  genres: string[] = [];
  loading = true;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.movieService.getMovies().subscribe({
      next: (movies) => {
        this.movies = movies;
        this.filteredMovies = movies;
        this.genres = this.movieService.getAllGenres();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading movies:', error);
        this.loading = false;
      }
    });
  }

  onSearchChange(): void {
    this.filterMovies();
  }

  onGenreChange(): void {
    this.filterMovies();
  }

  private filterMovies(): void {
    this.filteredMovies = this.movies.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesGenre = this.selectedGenre === 'all' || movie.genres.includes(this.selectedGenre);
      return matchesSearch && matchesGenre;
    });
  }
}