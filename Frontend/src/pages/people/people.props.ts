import { Person } from "../../shared/models/person";

export interface PeopleProps {
  people: Person[];

  isFavorite: boolean;
  isLoading: boolean;
  page: number;
  total: number;

  descriptionInfo: (id: number) => string;
  getPeople: (skip: number, take: number) => void;
  setPage: (page: number) => void;
  setFavorite: (id: number) => void;
}
