import { getMovieDetailsFor, getMovieWith, getMovies } from "./movie-service";

import { getPeople, setFavorite } from "./people-service";

export const services = {
  getMovieWith,
  getMovies,
  getMovieDetailsFor,
  getPeople,
  setFavorite,
};
