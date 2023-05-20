import { Person } from "./person";
import { MovieRating } from "./rating";

export interface Movie {
  id: number;
  title: string;
  year: number;
  posterUrl?: string;
  stars?: Person[];
  director?: Person;
  rating?: MovieRating;
}
