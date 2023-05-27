import { type Movie } from "../../shared/models";
import { UserReview } from "../../shared/models/movie";
import { Notification } from "../../shared/utils/typescript/types";

export interface MovieProps {
  userReview: UserReview;
  userId: number;
  username: string;
  movies: Movie[];
  filteredMovies: Movie[];
  movie: Movie;
  isLoading: boolean;
  page: number;
  total: number;
  isReviewDialogOpen: boolean;
  currentlyReviewingMovieId?: number;

  setUserReview: (userId: number, movieId: number, review: UserReview) => void;
  getUserReview: (userId: number, movieId: number) => void;
  getMovies: (skip: number, take: number, userId?: number) => void;
  getMovieDetailsFor: (id: number) => void;
  setFavorite: (userId: number, movieId: number) => void;
  setPage: (page: number) => void;
  clearUserReview: () => void;
  setIsReviewDialogOpen: (isOpen: boolean) => void;
  setCurrentlyReviewingMovieId: (id: number) => void;
  setFilterByName: () => void;
  setFilterByYear: () => void;
  setFilterByFavorite: () => void;
  clearFilters: () => void;
  setNotification: (n: Notification) => void;
}
