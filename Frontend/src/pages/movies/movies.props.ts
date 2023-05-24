import { type Movie } from "../../shared/models";
import { Notification } from "../../shared/utils/typescript/types";

export interface MovieProps {
  movies: Movie[];
  filteredMovies: Movie[];
  movie: Movie;
  isLoading: boolean;
  page: number;
  total: number;
  getMovies: (skip: number, take: number) => void;
  getMovieDetailsFor: (id: number) => void;
  setPage: (page: number) => void;
  setFilterByName: () => void;
  setFilterByYear: () => void;
  clearFilters: () => void;
  setNotification: (n: Notification) => void;
}
