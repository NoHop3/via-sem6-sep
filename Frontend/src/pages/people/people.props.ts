import { Person } from "../../shared/models/person";

export interface PeopleProps {
  people: Person[];
  isLoading: boolean;
  page: number;
  total: number;

  getPeople: (skip: number, take: number) => void;
  setPage: (page: number) => void;
  setFavorite: (id: number) => void;
}
