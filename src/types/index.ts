export interface Review {
  id: number;
  author: string;
  avatarUrl: string;
  rating: number;
  comment: string;
}

export interface Showtime {
  screen: number;
  time: string;
}

export interface Movie {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
  posterAiHint: string;
  rating: number;
  genres: string[];
  reviews: Review[];
  duration: number; // in minutes
  releaseYear: number;
  showtimes: Showtime[];
}
