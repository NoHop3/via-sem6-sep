import { Person } from "./person";
import { MovieRating } from "./rating";

export interface Movie {
  id: number;
  title: string;
  year: number;
  details: MovieDetails;
  userReview?: UserReview;
  reviews?: UserReview[];
  isFavorite?: boolean;
  posterUrl?: string;
  stars?: Person[];
  director?: Person[];
  rating?: MovieRating;
}

export interface MovieDetails {
  rated?: string;
  released?: string;
  runtime?: string;
  plot?: string;
  genre?: string;
  language?: string;
  country?: string;
}

export interface UserReview {
  id?: number;
  userId: number;
  movieId: number;
  reviewText: string;
}
