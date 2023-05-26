import { Movie } from "../../shared/models";

export interface MovieCardProps extends Movie {
  userId?: number;
  showFavorite?: boolean;
  disabledFavoriteButton?: boolean;

  getUserReview?: (userId: number, movieId: number) => void;
  onAddToFavoritesClick?: (userId: number, movieId: number) => void;
  onMovieClick: (id: number) => void;
}
