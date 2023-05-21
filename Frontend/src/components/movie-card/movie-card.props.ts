import { Movie } from "../../shared/models";

export interface MovieCardProps extends Movie {
  onMovieClick: (id: number) => void;
}
