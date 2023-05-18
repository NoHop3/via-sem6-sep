import { type Movie } from "../../shared/models";

export interface MovieProps {
  movies: Movie[];
  movie: Movie;
  isLoading: boolean;
  page: number;
  total: number;
  getMovieWith: (movieId: number) => void;
  getMovies: (skip: number, take: number) => void;
  setPage: (page: number) => void;
}
