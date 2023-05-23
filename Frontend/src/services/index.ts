import { getMovieDetailsFor, getMovieWith, getMovies } from "./movie-service";

import { getPeople, setFavorite } from "./people-service";

import { search } from "./search-service";

export const services = {
  getMovieWith,
  getMovies,
  getMovieDetailsFor,
  getPeople,
  setFavorite,
  search,
};
