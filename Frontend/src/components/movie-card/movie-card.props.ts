import { Movie } from "../../shared/models";
import { UserReview } from "../../shared/models/movie";

export interface MovieCardProps extends Movie {
  userId?: number;
  showFavorite?: boolean;
  disabledFavoriteButton?: boolean;
  userReview?: UserReview;

  setUserReview: (userId: number, movieId: number, review: UserReview) => void;
  getUserReview?: (userId: number, movieId: number) => void;
  onAddToFavoritesClick?: (userId: number, movieId: number) => void;
  onMovieClick: (id: number) => void;
}
