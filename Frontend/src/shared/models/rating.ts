import { Movie } from "./movie";

export interface MovieRating {
  id: number;
  rating: number;
  votes: number;
  movie?: Movie;
}
