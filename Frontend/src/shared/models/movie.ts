import { Person } from "./person";
import { MovieRating } from "./rating";

export interface Movie {
  id: number;
  title: string;
  year: number;
  details: MovieDetails;
  userRating?: number;
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
