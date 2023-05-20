import { type Movie } from "../../shared/models";

export interface MovieProps {
  movies: Movie[];
  movie: Movie;
  isLoading: boolean;
  page: number;
  total: number;
  getMovies: (skip: number, take: number) => void;
  getMovieDetailsFor: (id: number) => void;
  setPage: (page: number) => void;
}
