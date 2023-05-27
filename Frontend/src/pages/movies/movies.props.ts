import { type Movie } from "../../shared/models";
import { UserReview } from "../../shared/models/movie";
import { Notification } from "../../shared/utils/typescript/types";

export interface MovieProps {
  userId: number;
  movies: Movie[];
  filteredMovies: Movie[];
  movie: Movie;
  isLoading: boolean;
  page: number;
  total: number;
  userReview?: UserReview;
  getMovies: (skip: number, take: number, userId?: number) => void;
  getMovieDetailsFor: (id: number) => void;
  setFavorite: (userId: number, movieId: number) => void;
  setUserReview: (userId: number, movieId: number, review: UserReview) => void;
  getUserReview: (userId: number, movieId: number) => void;
  setPage: (page: number) => void;
  setFilterByName: () => void;
  setFilterByYear: () => void;
  setFilterByFavorite: () => void;
  clearFilters: () => void;
  setNotification: (n: Notification) => void;
}
