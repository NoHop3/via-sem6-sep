import { type Movie } from "../../shared/models";

export interface MovieDetailsProps {
  movie: Movie;
  isLoading: boolean;
}
