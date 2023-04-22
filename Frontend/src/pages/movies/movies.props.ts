import { type Movie } from "../../shared/models";

export interface MovieProps {
  movie: Movie;
  isLoading: boolean;
  getMovieWith: (movieId: number) => void;
}
