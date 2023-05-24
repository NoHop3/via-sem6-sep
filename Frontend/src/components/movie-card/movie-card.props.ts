import { Movie } from "../../shared/models";

export interface MovieCardProps extends Movie {
  isFavorite?: boolean;
  showFavorite?: boolean;
  disabledFavoriteButton?: boolean;

  onAddToFavoritesClick?: (id: number) => void;
  onMovieClick: (id: number) => void;
}
