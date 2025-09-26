import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Movie } from '../models/movie.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  // Mock data for now - replace with actual API calls
  private mockMovies: Movie[] = [
    {
      id: 'vikram',
      title: 'Vikram',
      description: 'A black-ops squad commander goes after a mysterious group of masked men who have declared war on the system.',
      posterUrl: 'https://placehold.co/400x600/000/FFF?text=Vikram',
      posterAiHint: 'action thriller',
      rating: 4.7,
      genres: ['Action', 'Thriller'],
      duration: 175,
      releaseYear: 2025,
      reviews: [
        { id: 1, author: 'Anbu', avatarUrl: 'https://i.pravatar.cc/150?u=anbu', rating: 5, comment: 'An absolute blast from start to finish. A true comeback!' },
        { id: 2, author: 'Priya', avatarUrl: 'https://i.pravatar.cc/150?u=priya', rating: 4, comment: 'Great action sequences, but the plot can be a bit confusing.' },
      ],
      showtimes: [
        { screen: 1, time: '4:30 PM' },
        { screen: 1, time: '8:00 PM' },
        { screen: 7, time: '5:00 PM' },
        { screen: 7, time: '9:30 PM' },
      ],
    },
    {
      id: 'leo',
      title: 'Leo',
      description: 'A mild-mannered café owner becomes a local hero through an act of violence, which sets off repercussions with a drug cartel that believes he was once a part of them.',
      posterUrl: 'https://placehold.co/400x600/000/FFF?text=Leo',
      posterAiHint: 'action crime',
      rating: 4.5,
      genres: ['Action', 'Thriller', 'Crime'],
      duration: 164,
      releaseYear: 2025,
      reviews: [
        { id: 1, author: 'Karthik', avatarUrl: 'https://i.pravatar.cc/150?u=karthik', rating: 5, comment: 'Thalapathy Vijay at his absolute best. The hyena fight was insane!' },
      ],
      showtimes: [
        { screen: 2, time: '6:00 PM' },
        { screen: 2, time: '8:45 PM' },
        { screen: 8, time: '10:00 PM' },
      ],
    },
    // Add more movies as needed
  ];

  constructor(private apiService: ApiService) {}

  getMovies(): Observable<Movie[]> {
    // Replace with actual API call when backend is ready:
    // return this.apiService.get<Movie[]>('/movies');
    return of(this.mockMovies);
  }

  getMovieById(id: string): Observable<Movie | undefined> {
    // Replace with actual API call when backend is ready:
    // return this.apiService.get<Movie>(`/movies/${id}`);
    const movie = this.mockMovies.find(m => m.id === id);
    return of(movie);
  }

  addReview(movieId: string, review: any): Observable<Movie> {
    return this.apiService.post<Movie>(`/movies/${movieId}/reviews`, review);
  }

  getAllGenres(): string[] {
    const genres = new Set<string>();
    this.mockMovies.forEach(movie => {
      movie.genres.forEach(genre => genres.add(genre));
    });
    return Array.from(genres).sort();
  }
}