import { getMovieDetailsFor, getMovieWith, getMovies } from "./movie-service";

import { getPeople, setFavorite } from "./people-service";

import { search } from "./search-service";

import { signIn, signUp } from "./user-service";

export const services = {
  getMovieWith,
  getMovies,
  getMovieDetailsFor,
  getPeople,
  setFavorite,
  search,
  signIn,
  signUp,
};
