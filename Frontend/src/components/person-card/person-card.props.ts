export interface PersonCardProps {
  id: number;
  title: string;
  imgSource?: string;
  description: string;
  date?: string;
  isFavorite: boolean;
  showFavorite: boolean;
  disabledFavoriteButton?: boolean;

  onAddToFavoritesClick: (id: number) => void;
}
